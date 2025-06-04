import { BadRequestException } from '@nestjs/common';
import { AuthErrorMessages } from '../constants';

export class UserAlreadyExistException extends BadRequestException {
  constructor() {
    super(AuthErrorMessages.USER_ALREADY_EXISTS);
  }
}
