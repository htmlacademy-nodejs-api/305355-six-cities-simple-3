import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import UserService from './user.service.js';
import { UserServiceInterface } from './user-service.iterface.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

export {userContainer};
