import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for user login.
 *
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
