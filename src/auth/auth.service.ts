import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import {
  UserAlreadyExistException,
  InvalidCredentialsException,
} from './exceptions';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async logout(userId: number) {
    return this.userService.deleteRefreshToken(userId);
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UserAlreadyExistException();
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.comparePasswords(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const tokens = {
      accessToken: this.jwtService.signAccessToken(user.id),
      refreshToken: this.jwtService.signRefreshToken(user.id),
    };

    await this.userService.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      tokens,
    };
  }
}
