import { NotFoundException } from '@nestjs/common';
import { UserErrorMessages } from '../utils';

/**
 * Exception thrown when a user is not found in the database.
 *
 * Used to indicate that the requested user does not exist.
 */
export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(UserErrorMessages.NOT_FOUND);
  }
}
