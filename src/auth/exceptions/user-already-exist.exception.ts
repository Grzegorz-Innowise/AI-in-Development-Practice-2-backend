import { BadRequestException } from '@nestjs/common';
import { AuthErrorMessages } from '../constants';

/**
 * Exception thrown when attempting to register a user with an email that already exists.
 *
 * Used in the registration process to prevent duplicate accounts.
 */
export class UserAlreadyExistException extends BadRequestException {
  constructor() {
    super(AuthErrorMessages.USER_ALREADY_EXISTS);
  }
}
