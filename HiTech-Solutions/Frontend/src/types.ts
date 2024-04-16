export interface ITest {
	id: number;
	titre: string;
	description: string;
	date: string;
	points: number;
}

export interface User {
	id: number;
	name: string;
	surname: string;
	email: string;
	tel: string;
	dateInscription: string;
	dateDeFin: string;
	password: string;
}

export interface TeacherCourse {
	id: number;
	user: User;
}

export interface Formation {
	id: number;
	name: string;
	description: string;
	photo: string;
}

export interface Course {
	id: number;
	name: string;
	teacherCourses: TeacherCourse[];
	formation: Formation;
}
