import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // const { ...userDetails, confirmPassword } = createUserDto;
    this.userService.createUser(createUserDto);
  }
}
