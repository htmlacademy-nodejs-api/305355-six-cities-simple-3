import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { createErrorObject } from '../../utils/common.js';
import { LoggerInterface } from '../logger/logger.interface.js';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string,
    private logger: LoggerInterface,
  ) {}

  public async execute({params}: Request, res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];

    if (!await this.service.exists(documentId)) {
      this.logger.error(`[${'DocumentExistsMiddleware'}]: ${StatusCodes.NOT_FOUND} - ${this.entityName} with ${documentId} not found`);
      res
        .status(StatusCodes.NOT_FOUND)
        .json(createErrorObject(`${this.entityName} with ${documentId} not found`));
    }

    next();
  }
}
