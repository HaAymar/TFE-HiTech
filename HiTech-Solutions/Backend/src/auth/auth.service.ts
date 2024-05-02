import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/services/users.service';
import { AuthPayloadDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto): Promise<any> {
    email = email.trim();

    if (!this.isValidEmail(email)) {
      throw new UnauthorizedException('Invalid email format.');
    }
    const usersInfo = await this.userService.findAllUsersWithRoles();
    const findUser = usersInfo.find((user) => user.Email === email);
    console.log(findUser.Password);
    if (!findUser) {
      throw new UnauthorizedException(
        'Aucun utilisateur trouvé avec cet email.',
      );
    }
    // console.log(await bcrypt.compare(password, findUser.Password));
    // const isMatch = await bcrypt.compare(password, findUser.Password);
    if (password !== findUser.Password) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    const { Password, ...user } = findUser;
    return this.jwtService.sign(user);
  }
  private isValidEmail(email: string): boolean {
    // Basic regex for email validation
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }
}
