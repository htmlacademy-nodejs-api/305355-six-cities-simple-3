import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { UserModel } from '../modules/user/user.model.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env port: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const user = await UserModel.create({
      name: 'user1',
      email: 'test@local.local',
      avatar: 'keks.jpg',
      // password: String,
      type: 'pro',
    });

    console.log(user);
  }
}
