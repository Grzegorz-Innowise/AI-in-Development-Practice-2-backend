/**
 * Represents the basic user object used throughout the application.
 *
 * @property {number} id - The unique identifier of the user.
 * @property {string} email - The user's email address.
 * @property {string} name - The user's full name.
 */
export interface User {
  id: number;
  email: string;
  name: string;
}
