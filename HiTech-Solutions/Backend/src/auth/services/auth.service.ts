import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';

interface UserInfo {
  id: number;
  email: string;
  password: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserInfo | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const userInfo: UserInfo = {
        id: user.id,
        email: user.email,
        role: user.role.name,
        name: user.name,
        password: user.password,
      };
      return userInfo;
    }
    return null;
  }

  async login(user: UserInfo) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
