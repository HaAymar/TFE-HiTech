import { Connection, DataSource, Repository } from 'typeorm';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from '../../typeorm/entities/Courses';
import { CreationTest } from '../../typeorm/entities/CreationTest';
import { Formation } from '../../typeorm/entities/Formations';
import { Student } from '../../typeorm/entities/Student';
import { StudentsFormation } from '../../typeorm/entities/StudentFormation';
import { TeachersCourse } from '../../typeorm/entities/TeachCourses';
import { Test } from '../../typeorm/entities/Test';
import { User } from '../../typeorm/entities/User';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CreationTest)
    private creationTestRepository: Repository<CreationTest>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(StudentsFormation)
    private studentsFormationRepository: Repository<StudentsFormation>,
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
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
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

  async findCoursesByStudentFormation(studentId: number): Promise<Course[]> {
    const studentFormations = await this.studentsFormationRepository.find({
      where: { student: { id: studentId } },
      relations: ['formation'],
    });

    let courses: Course[] = [];
    for (let stuf of studentFormations) {
      const formationCourses = await this.courseRepository.find({
        where: { formation: { id: stuf.formation.id } },
      });
      courses = courses.concat(formationCourses);
    }

    return courses;
  }

  async findAllTestsByStudentId(studentId: number): Promise<any[]> {
    try {
      const tests = await this.testRepository
        .createQueryBuilder('test')
        .leftJoinAndSelect('test.creationTest', 'creationTest')
        .leftJoinAndSelect('creationTest.course', 'course')
        .leftJoinAndSelect('creationTest.teacher', 'creationTeacher')
        .leftJoinAndSelect('test.teacher', 'courseTeacher')
        .where('test.student.id = :studentId', { studentId })
        .orderBy('creationTest.dateTest', 'DESC')
        .getMany();

      return tests.map((test) => ({
        testId: test.id,
        courseId: test.creationTest.course.id,
        courseName: test.creationTest.course.name,
        testName: test.creationTest.name,
        testDate: test.creationTest.dateTest,
        description: test.creationTest.description,
        cotation: test.creationTest.cotation,
        validation: test.validation,
        score: test.score,

        teacherId: test.creationTest.teacher.id,

        courseTeacherId: test.teacher.id,
      }));
    } catch (error) {
      console.error('Failed to fetch tests:', error);
      throw new Error('Error retrieving tests for student: ' + studentId);
    }
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

  async findTeacherCourses(userId: number): Promise<any[]> {
    const usersWithCourses = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.teachers', 'teacher')
      .leftJoinAndSelect('teacher.teachersCourses', 'teachersCourse')
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
