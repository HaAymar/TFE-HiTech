import axios from "axios";
import { atom, selector } from "recoil";

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
			const response = await axios.get<any>(
				"http://localhost:3001/users/infos"
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
