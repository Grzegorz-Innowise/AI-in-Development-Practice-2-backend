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
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      message: 'User updated successfully',
      status: 200,
      user: updatedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.userService.remove(id);
    return {
      message: 'User deleted successfully',
      status: 200,
      user: deletedUser,
    };
  }
}
