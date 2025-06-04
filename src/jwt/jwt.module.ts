// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { jwtConfig } from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
