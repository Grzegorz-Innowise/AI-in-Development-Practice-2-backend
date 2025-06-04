import {
  AccessTokenRequiredException,
  InvalidAccessTokenException,
  SessionExpiredException,
} from './exceptions';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { type JwtPayload } from './interfaces';

const MILLISECONDS_IN_SECOND = 1000;

@Injectable()
export class JwtService {
  private readonly accessTokenExpiresIn: string;
  private readonly accessTokenExpiresInSeconds: number;
  private readonly accessTokenSecret: string;
  private readonly refreshTokenExpiresIn: string;
  private readonly refreshTokenExpiresInSeconds: number;
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly jwtNestService: NestJwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenExpiresInSeconds = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION_TIME'),
    );
    this.accessTokenExpiresIn = `${this.accessTokenExpiresInSeconds}s`;
    this.accessTokenSecret =
      this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');

    this.refreshTokenExpiresInSeconds = parseInt(
      this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION_TIME'),
    );
    this.refreshTokenExpiresIn = `${this.refreshTokenExpiresInSeconds}s`;
    this.refreshTokenSecret =
      this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
  }

  private calculateExpiresAt(seconds: number): Date {
    return new Date(Date.now() + seconds * MILLISECONDS_IN_SECOND);
  }

  signAccessToken(userId: number) {
    const payload: JwtPayload = {
      sub: userId,
    };

    const token = this.jwtNestService.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: this.accessTokenExpiresIn,
    });

    return {
      token,
      expiresAt: this.calculateExpiresAt(this.accessTokenExpiresInSeconds),
    };
  }

  signRefreshToken(userId: number) {
    const payload: JwtPayload = {
      sub: userId,
    };

    const token = this.jwtNestService.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: this.refreshTokenExpiresIn,
    });

    return {
      token,
      expiresAt: this.calculateExpiresAt(this.refreshTokenExpiresInSeconds),
    };
  }

  verifyAccessToken(token: string) {
    try {
      return this.jwtNestService.verify<JwtPayload>(token, {
        secret: this.accessTokenSecret,
      });
    } catch {
      throw new InvalidAccessTokenException();
    }
  }
}
