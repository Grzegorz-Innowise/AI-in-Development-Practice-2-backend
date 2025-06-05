import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

/**
 * Exception thrown when a user's session has expired.
 *
 * Used to indicate that the JWT token is no longer valid due to expiration.
 */
export class SessionExpiredException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.SESSION_EXPIRED);
  }
}
