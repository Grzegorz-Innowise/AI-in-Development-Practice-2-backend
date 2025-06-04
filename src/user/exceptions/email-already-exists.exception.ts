import { ConflictException } from '@nestjs/common';
import { UserErrorMessages } from '../utils';

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(UserErrorMessages.EMAIL_ALREADY_EXISTS);
  }
}
