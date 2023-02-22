import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { createErrorObject } from '../../utils/common.js';
import { LoggerInterface } from '../logger/logger.interface.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  constructor(
    private logger: LoggerInterface,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req?.user) {
      this.logger.error(`[${'PrivateRouteMiddleware'}]: ${StatusCodes.UNAUTHORIZED} - ${'Unauthorized'}`);
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(createErrorObject('Unauthorized'));
    }

    return next();
  }
}
