import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AssignRoleDto } from '../dtos/AssignRole.dto';
import { CreateUserDto } from '../dtos/CreateUser.dto';
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
  @Get('infos')
  async getUsersInfos() {
    try {
      const users = await this.userService.findAllUsersWithDetails();
      return users;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Post('role/admin')
  createAdmin(@Body() assignRoleDto: AssignRoleDto) {
    return this.userService.createAdmin(assignRoleDto);
  }

  @Post('role/student')
  async createRoleStudent(
    @Body() body: { assignRoleDto: AssignRoleDto; id_formation: number },
  ) {
    return this.userService.createRoleStudent(
      body.assignRoleDto,
      body.id_formation,
    );
  }

  @Post('role/teacher')
  async createRoleTeacher(
    @Body() body: { assignRoleDto: AssignRoleDto; id_cours: number[] },
  ) {
    return this.userService.createRoleTeacher(
      body.assignRoleDto,
      body.id_cours,
    );
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: any) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
