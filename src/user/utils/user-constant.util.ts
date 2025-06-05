/**
 * Contains constant error messages related to user operations.
 *
 * @readonly
 * @property {string} NOT_FOUND - Message for user not found.
 * @property {string} AT_LEAST_ONE_FIELD_REQUIRED - Message for update validation requiring at least one field.
 * @property {string} EMAIL_ALREADY_EXISTS - Message for duplicate email registration attempt.
 */
export const UserErrorMessages = {
  NOT_FOUND: 'User not found',
  AT_LEAST_ONE_FIELD_REQUIRED: 'At least one field must be provided for update',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
};
