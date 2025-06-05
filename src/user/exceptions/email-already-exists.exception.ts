import { ConflictException } from '@nestjs/common';
import { UserErrorMessages } from '../utils';

/**
 * Exception thrown when attempting to register or update a user with an email that already exists.
 *
 * Used to prevent duplicate email addresses in the user database.
 */
export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(UserErrorMessages.EMAIL_ALREADY_EXISTS);
  }
}
