import { selector } from "recoil";

import { userIdState } from "./userIdState";

export const teacherCoursesState = selector({
	key: "teacherCoursesState",
	get: async ({ get }) => {
		const teacherId = get(userIdState);

		if (teacherId === null) {
			console.error("Teacher ID is null, cannot fetch courses.");
			return [];
		}

		const API_URL = `http://localhost:3001/courses/teacher/${teacherId}`;

		try {
			const response = await fetch(API_URL);
			const courses = await response.json();
			return courses;
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des cours de l'enseignant :",
				error
			);
			throw error;
		}
	},
});
