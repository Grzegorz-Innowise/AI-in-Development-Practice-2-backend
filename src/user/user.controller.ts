import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../jwt/guards/jwt-auth.guard';
import { type User as IUser } from '../common/interfaces';
import { User } from '../common/decorators';

/**
 * UserController handles all user-related HTTP requests such as retrieving, updating, and deleting users.
 *
 * Endpoints:
 * - GET /users: Retrieve a list of users
 * - GET /users/:id: Retrieve a user by ID
 * - GET /users/:id/company: Retrieve a user's company by user ID
 * - PATCH /users: Update a user
 * - DELETE /users: Delete a user
 *
 * Uses UserService for business logic and data persistence.
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query('username') username?: string) {
    return this.userService.findAll(username);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Get(':id/company')
  findCompany(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findCompany(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@User() { id }: IUser, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      message: 'User updated successfully',
      status: 200,
      user: updatedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@User() { id }: IUser) {
    const deletedUser = await this.userService.remove(id);
    return {
      message: 'User deleted successfully',
      status: 200,
      user: deletedUser,
    };
  }
}
