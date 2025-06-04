import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto, CreateUserDto } from './dto';
import {
  UserNotFoundException,
  EmailAlreadyExistsException,
} from './exceptions';
import { JwtToken } from 'src/jwt/interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  deleteRefreshToken(id: number) {
    return this.userRepository.deleteRefreshToken(id);
  }

  saveRefreshToken(id: number, refreshToken: JwtToken) {
    return this.userRepository.saveRefreshToken(id, refreshToken);
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll(username?: string) {
    return this.userRepository.findAll(username);
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  findOneBySub(sub: number) {
    return this.userRepository.findOneBySub(sub);
  }

  async findCompany(id: number) {
    const user = await this.findOneById(id);
    return user.company;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneById(id);

    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findOneByEmail(
        updateUserDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new EmailAlreadyExistsException();
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.findOneById(id);
    return this.userRepository.remove(id);
  }
}
