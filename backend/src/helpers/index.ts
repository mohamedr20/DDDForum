import { User } from '@prisma/client';
import { Response } from 'express';
import { ErrorName, ExceptionType } from '../types';
/**
 * Given a partial User record, this function will
 * check to see if a field in the request body is
 * null or not
 * @param {User}
 * @returns {boolean}
 */
export function validateFields(user: Partial<User>) {
  return Object.values(user).filter((val) => !!val === true).length > 0;
}

/**
 * Not a safe way to generate a password but it will do for
 * the code-first excercise
 * @param passwordLen
 * @returns
 */
export function generateRandomPassword(passwordLen = 12) {
  const numbers = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const symbols = '!@#$%^&*()';
  const chars = numbers + letters + symbols + letters.toUpperCase();

  let password = '';

  for (let i = 0; i < 12; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}
