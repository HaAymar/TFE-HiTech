import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";
import { studentIdRoleState } from "./idRoleState";

interface Course {
	id: number;
	name: string;
}

export const courseStudent = atom<Course[]>({
	key: "courseStudent",
	default: [],
});

export const fetchCourseStudent = selector<Course[]>({
	key: "fetchCourseStudent",
	get: async ({ get }): Promise<Course[]> => {
		const studentId = get(studentIdRoleState);
		try {
			const response = await axios.get<Course[]>(
				`${BE_URL}courses/student/${studentId}`
			);
			return response.data;
		} catch (error) {
			console.error("Failed to fetch course student:", error);
			throw error;
		}
	},
});
