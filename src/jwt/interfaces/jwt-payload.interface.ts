/**
 * Represents the payload of a JWT access token.
 *
 * @property {number} sub - The subject (typically the user ID) of the token.
 */
export interface JwtPayload {
  sub: number;
}
