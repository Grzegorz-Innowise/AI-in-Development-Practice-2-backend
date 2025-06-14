import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginDto } from './dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt/guards';
import { type JwtToken } from 'src/jwt/interfaces';
import { User } from '../common/decorators';
import { type User as IUser } from '../common/interfaces';

/**
 * AuthController handles all authentication-related HTTP requests such as registration, login, and logout.
 *
 * Endpoints:
 * - POST /auth/register: Register a new user
 * - POST /auth/login: Authenticate user and return tokens
 * - POST /auth/logout: Logout user and invalidate refresh token
 *
 * Uses AuthService for business logic and JWT for token management.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setRefreshTokenCookie(res: Response, refreshToken: JwtToken) {
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      secure: true,
      expires: refreshToken.expiresAt,
    });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);

    this.setRefreshTokenCookie(res, result.tokens.refreshToken);

    return {
      accessToken: result.tokens.accessToken,
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@User() { id }: IUser) {
    await this.authService.logout(id);

    return {
      message: 'Logged out successfully',
      status: 200,
    };
  }
}
