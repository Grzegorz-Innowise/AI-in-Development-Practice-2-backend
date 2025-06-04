import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

export class AccessTokenRequiredException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.ACCESS_TOKEN_REQUIRED);
  }
}
