import { User } from '@prisma/client';

export type GetUserByEmailResponse = {
  error: string | undefined;
  success: boolean;
  data: User;
};

export type UserNotFoundResponse = {
  error: Error;
  data: undefined;
  success: boolean;
};

export type CreateUserResponse = {
  error: string | undefined;
  success: boolean;
  data: User['id'];
};

export type EditUserResponse = {
  error: string | undefined;
  success: boolean;
  data: User;
};
