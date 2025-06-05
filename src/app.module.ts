import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

/**
 * AppModule is the root module of the application.
 *
 * - Imports AuthModule, UserModule, and ConfigModule (with global configuration).
 * - Serves as the entry point for the NestJS dependency injection system.
 */
@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
