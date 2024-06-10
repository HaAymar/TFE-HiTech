import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";
import { teacherIdRoleState } from "./idRoleTeacher";

interface Course {
	id: number;
	name: string;
}

interface Teacher {
	id: number;
}

interface CreationTest {
	id: number;
	name: string;
	dateTest: string;
	description: string;
	cotation: number;
	validation: "Yes" | "No";
	course: Course;
	teacher: Teacher;
}

export const creationTestAtom = atom<CreationTest[]>({
	key: "creationTestAtom",
	default: [],
});

export const fetchCreationTests = selector<CreationTest[]>({
	key: "fetchCreationTests",
	get: async ({ get }): Promise<CreationTest[]> => {
		const teacherId = get(teacherIdRoleState);
		try {
			const response = await axios.get<CreationTest[]>(
				`${BE_URL}creationTest/${teacherId}`
			);
			return response.data;
		} catch (error) {
			console.error("Failed to fetch creation tests:", error);
			throw error;
		}
	},
});
