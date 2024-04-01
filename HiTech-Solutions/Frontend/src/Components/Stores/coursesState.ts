import axios from "axios";
import { atom, selector } from "recoil";

export interface Courses {
	id: number;
	name: string;
}

export const courseListState = atom<Courses[]>({
	key: "courseListState",
	default: [],
});

export const fetchCourses = selector({
	key: "fetchCourses",
	get: async () => {
		try {
			const response = await axios.get<Courses[]>(
				"http://localhost:3001/courses"
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
