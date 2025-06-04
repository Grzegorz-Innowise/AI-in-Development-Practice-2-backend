import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

export class InvalidAccessTokenException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.INVALID_ACCESS_TOKEN);
  }
}
