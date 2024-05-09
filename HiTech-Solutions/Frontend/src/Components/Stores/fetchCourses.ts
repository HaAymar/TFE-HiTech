import axios from "axios";
import { atom, selector } from "recoil";

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
			const response = await axios.get<any>(
				"http://localhost:3001/courses"
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
