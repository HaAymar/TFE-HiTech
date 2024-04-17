import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from '../dtos/CreateUser.dto';
// import { UpdateUserDto } from '../dtos/UpdateUser.dto';
// import { DeleteUserDto } from '../dtos/DeleteUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      const users = await this.userService.findAllUsersWithRoles();
      return { data: users, message: 'Users retrieved successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return { data: newUser, message: 'User created successfully' };
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  // Uncomment and use when DTOs and methods are defined and available
  /*
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDto);
      return { data: updatedUser, message: 'User updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.NOT_FOUND);
    }
  }
  */
}
