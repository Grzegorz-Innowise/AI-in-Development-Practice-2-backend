import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

/**
 * Exception thrown when an invalid access token is provided in the request.
 *
 * Used to indicate that the provided JWT access token is not valid or has been tampered with.
 */
export class InvalidAccessTokenException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.INVALID_ACCESS_TOKEN);
  }
}
