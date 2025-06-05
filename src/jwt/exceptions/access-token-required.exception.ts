import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

/**
 * Exception thrown when an access token is required but not provided in the request.
 *
 * Used to indicate that authentication is mandatory for the requested resource.
 */
export class AccessTokenRequiredException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.ACCESS_TOKEN_REQUIRED);
  }
}
