import { NotFoundException } from '@nestjs/common';
import { UserErrorMessages } from '../utils';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(UserErrorMessages.NOT_FOUND);
  }
}
