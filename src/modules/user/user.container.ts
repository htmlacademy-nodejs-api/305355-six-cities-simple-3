import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import UserService from './user.service.js';
import { UserServiceInterface } from './user-service.iterface.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import UserController from './user.controller.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
userContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

export {userContainer};
