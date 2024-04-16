import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/services/users.service';
import { AuthPayloadDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const usersInfo = await this.userService.findAllUsersWithRoles();
    const findUser = usersInfo.find((user) => user.Email === email);
    console.log(usersInfo);
    console.log(findUser);
    if (!findUser) return null;

    if (password === findUser.Password) {
      const { Password, ...user } = findUser;

      return this.jwtService.sign(user);
    }
  }
}
