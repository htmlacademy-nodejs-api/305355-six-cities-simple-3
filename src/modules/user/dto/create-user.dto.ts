import { IsEmail, IsString, Length } from 'class-validator';
import { UserType } from '../../../types/user.type.js';

export default class CreateUserDTO {
  @IsString({message: 'avatar is required'})
  @Length(1, 15, {message: 'name must be from 1 to 15 symbols'})
  public name!: string;

  @IsEmail({}, {message: 'must be a valid email'})
  public email!: string;

  @IsString({message: 'avatar is required'})
  public avatar!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'password must be from 6 to 12 symbols'})
  public password!: string;

  @IsString({message: 'type is required'})
  public type!: UserType;
}
