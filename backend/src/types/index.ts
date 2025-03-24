import { User } from '@prisma/client';
import {
  UserNotFoundException,
  EmailAlreadyInUseException,
  ValidationException,
  UserNameTakenException,
  ServerException
} from '../errors';

type EmailAlreadyInUse = 'EmailAlreadyInUse';
type UserNameTaken = 'UsernameAlreadyTaken';
type ValidationError = 'ValidationError';
type ServerError = 'ServerError';
type UserNotFound = 'UserNotFound';

type ErrorName =
  | EmailAlreadyInUse
  | UserNameTaken
  | UserNotFound
  | ValidationError
  | ServerError;
type ExceptionType =
  | UserNameTakenException
  | EmailAlreadyInUseException
  | ValidationException
  | ServerException;

export type UserNotFoundResponse = {
  error: UserNotFoundException;
  data: UserNotFound;
  success: boolean;
};

export type EmailAlreadyInUseResponse = {
  error: EmailAlreadyInUseException;
  data: EmailAlreadyInUse;
  success: boolean;
};

export type UserNameAlreadyTakenResponse = {
  error: UserNameTakenException;
  data: UserNameTaken;
  success: boolean;
};

export type ErrorResponse = {
  error: ExceptionType;
  data: ErrorName;
  success: boolean;
};

export type SuccessUserResponse = {
  data: User | User['id'];
  success: true;
};

export type EditUserResponse =
  | SuccessUserResponse
  | UserNameAlreadyTakenResponse
  | EmailAlreadyInUseResponse;
export type GetUserByEmailResponse = SuccessUserResponse | UserNotFoundResponse;
export type CreateUserResponse = SuccessUserResponse;
