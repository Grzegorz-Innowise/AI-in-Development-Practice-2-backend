import { UnauthorizedException } from '@nestjs/common';
import { JwtErrorMessages } from '../constants/jwt.constant';

export class SessionExpiredException extends UnauthorizedException {
  constructor() {
    super(JwtErrorMessages.SESSION_EXPIRED);
  }
}
