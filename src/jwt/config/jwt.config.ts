import { ConfigService } from '@nestjs/config';

/**
 * Provides JWT configuration for the application using values from the ConfigService.
 *
 * - The secret is loaded from the JWT_ACCESS_SECRET environment variable.
 * - The token expiration time is loaded from JWT_ACCESS_EXPIRATION_TIME (in seconds).
 *
 * @param {ConfigService} configService - The NestJS ConfigService instance.
 * @returns {object} JWT configuration object for use with JwtModule.
 */
const getAccessTokenExpirationTime = (configService: ConfigService) =>
  `${configService.getOrThrow('JWT_ACCESS_EXPIRATION_TIME')}s`;

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: getAccessTokenExpirationTime(configService),
  },
});
