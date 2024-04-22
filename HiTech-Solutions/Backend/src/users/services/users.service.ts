import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { User } from '../../typeorm/entities/User';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }
  //------------------ In INSCRIPTION /!\ There is an error idRole and idSection do not accept the registration /!\ ------------------//

  // async findOneByEmail(email: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({
  //     where: { email },
  //     relations: ['role'],
  //   });
  // }
  async findAllUsersWithRoles(): Promise<any> {
    const query = `
      SELECT
        u.Id AS UserId,
        u.Name,
        u.Surname,
        u.Email,
        u.Password,
        COALESCE(r.Name, 'Unknown') AS RoleName
      FROM
        Users u
      LEFT JOIN
        Admins a ON u.Id = a.Id_userId
      LEFT JOIN
        Teachers t ON u.Id = t.Id_userId
      LEFT JOIN
        Students s ON u.Id = s.Id_userId
      LEFT JOIN
        Roles r ON r.Id = a.Id_role OR r.Id = t.Id_role OR r.Id = s.Id_role;
    `;
    return this.entityManager.query(query);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      // dateInscription: new Date(),
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
