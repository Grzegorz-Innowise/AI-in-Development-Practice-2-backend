import { UnauthorizedException } from '@nestjs/common';
import { AuthErrorMessages } from '../constants';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(AuthErrorMessages.INVALID_CREDENTIALS);
  }
}
