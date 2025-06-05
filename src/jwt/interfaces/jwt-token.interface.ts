/**
 * Represents a JWT token object with its value and expiration date.
 *
 * @property {string} token - The JWT token string.
 * @property {Date} expiresAt - The expiration date and time of the token.
 */
export interface JwtToken {
  token: string;
  expiresAt: Date;
}
