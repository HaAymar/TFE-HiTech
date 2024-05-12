import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";

interface Course {
	courseId: number;
	courseName: string;
}
interface Formation {
	formationId: number;
	formationName: string;
}
interface UserDetail {
	formations?: Formation[];
	courses?: Course[];
}

interface User {
	id?: number;
	name: string;
	surname: string;
	email: string;
	role: string;
	tel: string;
	details: UserDetail;
}
export const usersAtom = atom<User[]>({
	key: "usersAtom",
	default: [],
});

export const fetchUsers = selector({
	key: "fetchUsers",
	get: async ({ get }) => {
		try {
			const response = await axios.get<any>(`${BE_URL}users/infos`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
