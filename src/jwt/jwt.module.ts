import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { jwtConfig } from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * JwtModule bundles all JWT-related components, including services and configuration.
 *
 * - Registers the NestJS JwtModule asynchronously using configuration from ConfigService.
 * - Provides JwtService for signing and verifying JWT tokens.
 *
 * Used throughout the application for authentication and authorization.
 */

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
