import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '../jwt/jwt.module';

/**
 * UserModule bundles all user-related components, including controllers, services, and repositories.
 *
 * Imports:
 * - DatabaseModule: Database access
 *
 * Provides UserService and UserRepository for use in other modules.
 */
@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
