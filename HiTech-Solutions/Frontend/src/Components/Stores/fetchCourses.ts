import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";

interface CourseAndRole {
	id: number;
	name: string;
}

export const courseAtom = atom<CourseAndRole[]>({
	key: "courseAtom",
	default: [],
});

export const fetchCourses = selector({
	key: "fetchCourses",
	get: async ({ get }) => {
		try {
			const response = await axios.get<any>(`${BE_URL}courses`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
