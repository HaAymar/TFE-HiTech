import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '../dtos/CreateUser.dto';
// import { CreateUserDto } from '../../dtos/CreateUser.dto';
// import { DeleteUserDto } from '../../dtos/DeleteUser.dto';
// import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.userService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    // const { ...userDetails, confirmPassword } = createUserDto;
    console.log(createUserDto);
    this.userService.createUser(createUserDto);
  }

  // @Put(':id')
  // async updateUserById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   await this.userService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // async deleteUserById(@Param('id', ParseIntPipe) id: number) {
  //   await this.userService.deleteUser(id);
  // }
}
