import * as jose from 'jose';
import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import { OfferFeature, OfferPhotos, OfferType } from '../types/offer.type';
import { UserType } from '../types/user.type';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, issueDate, cityName, cityCoords, previewImage, photos, isPremium, rating, type, roomsCount, guestsCount, price, features, userName, userEmail, userAvatar, userPass, userType, commentsCount] = tokens;
  return {
    title,
    description,
    issueDate: new Date(issueDate),
    city: {
      name: cityName,
      latlng: cityCoords.split(';').map((coord) => Number(coord)) as [number, number],
    },
    previewImage,
    photos: photos.split(';') as OfferPhotos,
    isPremium: isPremium === 'true',
    rating: Number(rating),
    type: type as OfferType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    price: Number(price),
    features: features.split(';') as OfferFeature[],
    author: {
      name: userName,
      email: userEmail,
      avatar: userAvatar,
      password: userPass,
      type: userType as UserType,
    },
    commentsCount: Number(commentsCount),
    coords: [1,2] as [number, number],
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T,V>(someDTO: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDTO, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
