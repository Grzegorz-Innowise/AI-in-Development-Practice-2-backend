import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../jwt/jwt.module';

/**
 * AuthModule bundles all authentication-related components, including controllers, services, and dependencies.
 *
 * Imports:
 * - DatabaseModule: Database access
 * - UserModule: User management
 * - JwtModule: JWT token management
 *
 * Provides AuthService and exposes AuthController.
 */
@Module({
  imports: [DatabaseModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
