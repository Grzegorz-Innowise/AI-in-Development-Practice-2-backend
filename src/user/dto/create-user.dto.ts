import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object for creating a new user.
 *
 * Contains all required fields for user creation, including address, geo, and company information as flat properties.
 *
 * @property {string} name - The user's full name.
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} phone - The user's phone number.
 * @property {string} website - The user's website.
 * @property {string} street - The user's street address.
 * @property {string} suite - The user's suite/apartment.
 * @property {string} city - The user's city.
 * @property {string} zipcode - The user's postal code.
 * @property {string} lat - The latitude of the user's address.
 * @property {string} lng - The longitude of the user's address.
 * @property {string} companyName - The user's company name.
 * @property {string} companyCatchPhrase - The user's company catch phrase.
 * @property {string} companyBs - The user's company business slogan.
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  // Address fields
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  suite: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  // Geo fields
  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;

  // Company fields
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyCatchPhrase: string;

  @IsString()
  @IsNotEmpty()
  companyBs: string;
}
