import { UnauthorizedException } from '@nestjs/common';
import { AuthErrorMessages } from '../constants';

/**
 * Exception thrown when user credentials are invalid during authentication.
 *
 * Typically used in the login process to indicate incorrect email or password.
 */
export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(AuthErrorMessages.INVALID_CREDENTIALS);
  }
}
