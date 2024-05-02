import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Admin } from '../../typeorm/entities/Admin';
import { Course } from '../../typeorm/entities/Courses';
import { Formation } from '../../typeorm/entities/Formations';
import { Role } from '../../typeorm/entities/Role';
import { Student } from '../../typeorm/entities/Student';
import { StudentsFormation } from '../../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../../typeorm/entities/TeachCourses';
import { Teacher } from '../../typeorm/entities/Teacher';
import { User } from '../../typeorm/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(TeachersCourse)
    private teachersCourseRepository: Repository<TeachersCourse>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(StudentsFormation)
    private studentsFormationRepository: Repository<StudentsFormation>,
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

  async findAllUsersWithDetails(): Promise<any[]> {
    const users = await this.userRepository.find();

    return Promise.all(
      users.map(async (user) => {
        const userDetails: any = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          tel: user.tel,
          role: null,
          details: {},
        };

        const admin = await this.adminRepository.findOne({
          where: { user: { id: user.id } },
        });

        const teacher = await this.teacherRepository.findOne({
          where: { user: { id: user.id } },
          relations: ['teachersCourses.course'],
        });

        const student = await this.studentRepository.findOne({
          where: { user: { id: user.id } },
          relations: ['studentsFormations.formation'],
        });

        if (admin) {
          userDetails.role = 'Admin';
        } else if (teacher) {
          userDetails.role = 'Teacher';
          userDetails.details.courses = teacher.teachersCourses.map((tc) => ({
            courseId: tc.course.id,
            courseName: tc.course.name,
          }));
        } else if (student) {
          userDetails.role = 'Student';
          userDetails.details.formations = student.studentsFormations.map(
            (sf) => ({
              formationId: sf.formation.id,
              formationName: sf.formation.name,
            }),
          );
        } else {
          userDetails.role = '-';
        }

        return userDetails;
      }),
    );
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.manager.transaction(async (entityManager) => {
      const user = await entityManager.findOne(User, {
        where: { id: userId },
        relations: [
          'admins',
          'teachers',
          'students',
          'students.studentsFormations',
          'teachers.teachersCourses',
        ],
      });

      console.log(user.teachers);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      if (user.admins && user.admins.length > 0) {
        await entityManager.remove(user.admins);
      }

      if (user.teachers && user.teachers.length > 0) {
        for (const teacher of user.teachers) {
          if (teacher.teachersCourses) {
            await entityManager.remove(teacher.teachersCourses);
          }
          await entityManager.remove(teacher);
        }
      }

      if (user.students && user.students.length > 0) {
        for (const student of user.students) {
          if (student.studentsFormations) {
            await entityManager.remove(student.studentsFormations);
          }
          await entityManager.remove(student);
        }
      }

      await entityManager.remove(user);
    });
  }

  async createUser(userData: any): Promise<User[]> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateUser(userId: number, userData: any): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
    this.userRepository.merge(user, userData);
    return this.userRepository.save(user);
  }
}
