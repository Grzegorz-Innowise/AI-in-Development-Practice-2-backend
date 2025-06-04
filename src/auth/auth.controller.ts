import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginDto } from './dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt/guards';
import { RequestWithUser } from './interfaces';
import { type JwtToken } from 'src/jwt/interfaces';

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
  async logout(@Req() { user }: RequestWithUser) {
    await this.authService.logout(user.id);

    return {
      message: 'Logged out successfully',
      status: 200,
    };
  }
}
