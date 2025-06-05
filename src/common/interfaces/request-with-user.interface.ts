import { type Request } from 'express';
import { User } from './user.interface';

/**
 * Extends the Express Request interface to include the authenticated user object.
 *
 * This interface is used to type requests that have a user property attached,
 * typically after authentication middleware has run.
 *
 * @property {User} user - The authenticated user object.
 */
export interface RequestWithUser extends Request {
  user: User;
}
