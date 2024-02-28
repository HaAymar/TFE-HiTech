import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }
  //------------------ In INSCRIPTION /!\ There is an error idRole and idSection do not accept the registration /!\ ------------------//

  createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      dateInscription: new Date(),
    });
    console.log(newUser);
    return this.userRepository.save(newUser);
  }

  // updateUser(id: number, updateUserDetails: UpdateUserParams) {
  //   return this.userRepository.update({ id }, { ...updateUserDetails });
  // }

  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }
}
