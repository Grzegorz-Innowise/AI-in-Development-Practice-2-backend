import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserErrorMessages } from '../utils';

@ValidatorConstraint({ name: 'atLeastOneField', async: false })
class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(_: unknown, args: ValidationArguments) {
    const obj = args.object as UpdateUserDto;

    for (const key in obj) {
      if (key === '_atLeastOneField') continue;
      if (obj[key] !== undefined && obj[key] !== null) {
        return true;
      }
    }
    return false;
  }

  defaultMessage() {
    return UserErrorMessages.AT_LEAST_ONE_FIELD_REQUIRED;
  }
}

import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for updating user information.
 *
 * All fields are optional, but at least one must be provided for a valid update request.
 *
 * @property {string} [password] - The user's new password.
 * @property {string} [name] - The user's new name.
 * @property {string} [email] - The user's new email address.
 * @property {unknown} [_atLeastOneField] - Internal property for validation (at least one field required).
 */
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @Validate(AtLeastOneFieldConstraint)
  _atLeastOneField?: unknown;
}
