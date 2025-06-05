/**
 * Custom decorator to extract the user object from the request in route handlers.
 *
 * Usage example:
 *   @User() user: UserEntity
 *
 * This decorator simplifies access to the authenticated user in controllers.
 */

import { RequestWithUser } from '../interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
