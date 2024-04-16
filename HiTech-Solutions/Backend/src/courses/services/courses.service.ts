import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { Formation } from '../../typeorm/entities/Formations';
import { TeachersCourse } from '../../typeorm/entities/TeachCourses';
import { Teacher } from '../../typeorm/entities/Teacher';
import { User } from '../../typeorm/entities/User';

// import { DeleteCourseDto } from '../dtos/deleteCourses';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(TeachersCourse)
    private teacherRepository: Repository<Course>,
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(TeachersCourse)
    private teacherCoursesRepository: Repository<TeachersCourse>,
  ) {}

  findCourses() {
    return this.courseRepository.find();
  }

  async findByFormationName(formationName: string): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('c')
      .innerJoin('c.formation', 'f')
      .where('f.name = :formationName', { formationName })
      .getMany();
  }

  async addCourseToFormation(
    formationId: number,
    courseData: Partial<Course>,
  ): Promise<Course> {
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
    });

    if (!formation) {
      throw new Error(`Formation with ID ${formationId} not found`);
    }

    const course = this.courseRepository.create(courseData);
    course.formation = formation;

    const savedCourse = await this.courseRepository.save(course);
    console.log('New course:', savedCourse);
    return savedCourse;
  }

  // async findTeacherCourses(teacherId: number): Promise<Course[]> {
  //   const courses = await this.courseRepository
  //     .createQueryBuilder('course')
  //     .innerJoinAndSelect('course.teacherCourses', 'teacherCourse')
  //     .innerJoinAndSelect('teacherCourse.user', 'user')
  //     .innerJoinAndSelect('course.formation', 'formation')
  //     .where('user.id = :teacherId', { teacherId })
  //     .andWhere('user.roleId = :roleId', { roleId: 2 })
  //     .getMany();

  //   return courses;
  // }

  // async findTeacherCourses(userId: number): Promise<any[]> {
  //   const teacher = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.teachers', 'teacher')
  //     .where('user.id = :userId', { userId })
  //     .getOne();

  //   if (!teacher || !teacher.teachers) {
  //     throw new Error('Aucun enseignant trouvé pour cet utilisateur');
  //   }
  //   console.log(teacher);
  //   const teacherCourses = await this.teacherCoursesRepository
  //     .createQueryBuilder('teachersCourse')
  //     .innerJoinAndSelect('teachersCourse.course', 'course')
  //     .innerJoinAndSelect('course.formation', 'formation') // Joindre la formation à laquelle le cours appartient
  //     .where('teachersCourse.teacher.id = :teacherId', {
  //       teacherId: teacher.id,
  //     })
  //     .getMany();

  //   // Puisque le résultat comprend des entités TeachersCourse, extrayez les parties nécessaires
  //   return teacherCourses.map((tc) => ({
  //     courseId: tc.course.id, // Supposant que votre entité Course a un champ id
  //     courseName: tc.course.name, // Supposant que votre entité Course a un champ name
  //     formationId: tc.course.formation.id, // Accéder à l'ID de la formation à travers la relation
  //     formationName: tc.course.formation.name, // Supposant que votre entité Formation a un champ name
  //   }));
  // }

  async findTeacherCourses(userId: number): Promise<any[]> {
    // Démarrage de la requête en utilisant l'entité 'User'
    const usersWithCourses = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.teachers', 'teacher') // Assurez-vous que la relation est bien configurée
      .leftJoinAndSelect('teacher.teachersCourses', 'teachersCourse') // Relation One-to-Many vers TeachersCourse
      .leftJoinAndSelect('teachersCourse.course', 'course')
      .leftJoinAndSelect('course.formation', 'formation')
      .where('user.id = :userId', { userId })
      .getMany();

    // Transformation des données extraites pour former la structure de sortie désirée
    return usersWithCourses.flatMap((user) =>
      user.teachers.flatMap((teacher) =>
        teacher.teachersCourses.map((tc) => ({
          courseId: tc.course.id,
          courseName: tc.course.name,
          formationId: tc.course.formation.id,
          formationName: tc.course.formation.name,
          teacherName: user.name, // Assumant que 'name' est une propriété de 'User'
        })),
      ),
    );
  }

  async deleteCoursesByFormationId(formationId: number): Promise<void> {
    await this.courseRepository
      .createQueryBuilder()
      .delete()
      .from(Course)
      .where('id_formation= :formationId', { formationId })
      .execute();

    await this.formationRepository.delete(formationId);
  }
}
