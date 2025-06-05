import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { userSelect } from './utils';
import { UpdateUserDto, CreateUserDto } from './dto';
import { JwtToken } from 'src/jwt/interfaces';

/**
 * UserRepository provides methods for interacting with the user-related tables in the database.
 *
 * Handles user creation, retrieval, update, and refresh token management.
 * Uses DatabaseService for database operations.
 */
@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  deleteRefreshToken(id: number) {
    return this.dbService.userAuth.update({
      where: { id },
      data: { refreshToken: null, refreshTokenExpiresAt: null },
    });
  }

  saveRefreshToken(id: number, refreshToken: JwtToken) {
    return this.dbService.userAuth.update({
      where: { id },
      data: {
        refreshToken: refreshToken.token,
        refreshTokenExpiresAt: refreshToken.expiresAt,
      },
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.dbService.userAuth.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
        profile: {
          create: {
            username: createUserDto.username,
            phone: createUserDto.phone,
            website: createUserDto.website,
            address: {
              create: {
                street: createUserDto.street,
                suite: createUserDto.suite,
                city: createUserDto.city,
                zipcode: createUserDto.zipcode,
                geo: {
                  create: {
                    lat: createUserDto.lat,
                    lng: createUserDto.lng,
                  },
                },
              },
            },
            company: {
              create: {
                name: createUserDto.companyName,
                catchPhrase: createUserDto.companyCatchPhrase,
                bs: createUserDto.companyBs,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  findAll(username?: string) {
    return this.dbService.user.findMany({
      where: username
        ? { username: { contains: username, mode: 'insensitive' } }
        : undefined,
      select: userSelect,
    });
  }

  findOneById(id: number) {
    return this.dbService.user.findUnique({
      where: { userId: id },
      select: userSelect,
    });
  }

  findOneBySub(sub: number) {
    return this.dbService.userAuth.findUnique({
      where: { id: sub },
    });
  }

  findOneByEmail(email: string) {
    return this.dbService.userAuth.findUnique({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.dbService.userAuth.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        passwordHash: updateUserDto.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  remove(id: number) {
    return this.dbService.userAuth.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
