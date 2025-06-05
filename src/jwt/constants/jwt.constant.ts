/**
 * Contains constant error messages related to JWT authentication and token validation.
 *
 * @readonly
 * @property {string} SESSION_EXPIRED - Message for expired session.
 * @property {string} INVALID_ACCESS_TOKEN - Message for invalid access token.
 * @property {string} INVALID_REFRESH_TOKEN - Message for invalid refresh token.
 * @property {string} ACCESS_TOKEN_REQUIRED - Message for missing access token.
 */
export const JwtErrorMessages = {
  SESSION_EXPIRED: 'Session has expired',
  INVALID_ACCESS_TOKEN: 'Invalid access token provided',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token provided',
  ACCESS_TOKEN_REQUIRED: 'Access token is required',
};
