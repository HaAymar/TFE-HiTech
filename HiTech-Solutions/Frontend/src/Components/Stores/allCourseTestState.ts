import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";
import { studentIdRoleState } from "./idRoleState";

interface Test {
	testId: number;
	courseId: number;
	courseName: string;
	testName: string;
	testDate: string;
	description: string;
	cotation: string;
	validation: string;
	score: number;
	teacherId: number;
	courseTeacherId: number;
}
export const allCourseTest = atom<Test[]>({
	key: "allCourseTest",
	default: [],
});

export const fetchAllCourseTest = selector<Test[]>({
	key: "fetchAllCourseTest",
	get: async ({ get }): Promise<Test[]> => {
		const studentId = get(studentIdRoleState);
		try {
			const response = await axios.get<Test[]>(
				`${BE_URL}courses/tests/${studentId}`
			);
			return response.data;
		} catch (error) {
			console.error("Failed to fetch course test:", error);
			throw error;
		}
	},
});
