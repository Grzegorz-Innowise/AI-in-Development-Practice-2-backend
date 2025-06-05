import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '../jwt.service';
import {
  AccessTokenRequiredException,
  SessionExpiredException,
} from '../exceptions';
import { type Request } from 'express';

/**
 * JwtAuthGuard is a custom guard that protects routes by validating JWT access tokens.
 *
 * - Extracts the token from the Authorization header.
 * - Verifies the token using JwtService.
 * - Loads the user from the database and attaches it to the request object.
 * - Throws appropriate exceptions if the token is missing, invalid, or the session is expired.
 *
 * Used to secure endpoints that require authentication.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AccessTokenRequiredException();
    }

    const token = authHeader.split(' ')[1];

    const { sub } = this.jwtService.verifyAccessToken(token);

    const user = await this.userService.findOneBySub(sub);

    if (!user?.refreshToken) {
      throw new SessionExpiredException();
    }

    request.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return true;
  }
}
