import { Connection, DataSource, Repository } from 'typeorm';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { CreationTest } from '../../typeorm/entities/CreationTest';
import { Formation } from '../../typeorm/entities/Formations';
import { StudentsFormation } from '../../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../../typeorm/entities/TeachCourses';
import { User } from '../../typeorm/entities/User';

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
    private connection: Connection,
    private readonly dataSource: DataSource,
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

    return usersWithCourses.flatMap((user) =>
      user.teachers.flatMap((teacher) =>
        teacher.teachersCourses.map((tc) => ({
          courseId: tc.course.id,
          courseName: tc.course.name,
          formationId: tc.course.formation.id,
          formationName: tc.course.formation.name,
          teacherName: user.name,
        })),
      ),
    );
  }

  async deleteFormationById(formationId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(StudentsFormation)
        .where('id_formation = :formationId', { formationId })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Course)
        .where('id_formation = :formationId', { formationId })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Formation)
        .where('id = :formationId', { formationId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteCoursesById(courseId: number): Promise<void> {
    try {
      await this.connection.transaction(async (manager) => {
        const creationTests = await manager
          .getRepository(CreationTest)
          .createQueryBuilder('ct')
          .where('ct.id_course = :courseId', { courseId })
          .getMany();

        for (const ct of creationTests) {
          await manager
            .getRepository('test')
            .createQueryBuilder()
            .delete()
            .from('test')
            .where('id_creatTest = :id', { id: ct.id })
            .execute();
        }

        await manager
          .getRepository(CreationTest)
          .createQueryBuilder()
          .delete()
          .from(CreationTest)
          .where('id_course = :courseId', { courseId })
          .execute();

        await manager
          .getRepository(TeachersCourse)
          .createQueryBuilder()
          .delete()
          .from(TeachersCourse)
          .where('id_course = :courseId', { courseId })
          .execute();

        await manager.getRepository(Course).delete(courseId);
      });
    } catch (error) {
      console.error('Failed to delete course:', error);
      throw new InternalServerErrorException('Failed to delete course');
    }
  }
}
