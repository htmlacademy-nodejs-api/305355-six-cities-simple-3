import { IsDateString, IsEnum, Max, MaxLength, Min, MinLength } from 'class-validator';
import { OfferType } from '../../../types/offer.type.js';

export default class CreateOfferDTO {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'issueDate must be valid ISO date'})
  public issueDate!: Date;

  @MaxLength(256, {message: 'Too long for previewImage'})
  public previewImage!: string;

  @Min(1, {message: 'rating must be 1 or more'})
  @Max(5, {message: 'rating must be 5 or less'})
  public rating!: number;

  @IsEnum(OfferType, {message: 'type must be correct'})
  public type!: OfferType;

  @Min(1, {message: 'minimum valid rooms is 1'})
  @Max(8, {message: 'maximum valid rooms is 8'})
  public roomsCount!: number;

  @Min(1, {message: 'minimum valid guests is 1'})
  @Max(10, {message: 'maximum valid guests is 10'})
  public guestsCount!: number;

  @Min(100, {message: 'rating must be 1 or more'})
  @Max(100000, {message: 'rating must be 5 or less'})
  public price!: number;

  public userId!: string;
}
