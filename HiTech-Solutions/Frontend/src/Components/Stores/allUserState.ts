import axios from "axios";
import { atom, selector } from "recoil";

interface User {
	name: string;
	surname: string;
	email: string;
	tel: string;
}
export const usersAtom = atom<User[]>({
	key: "allUsersAtom",
	default: [],
});

export const fetchAllUsers = selector({
	key: "fetchUsers",
	get: async () => {
		try {
			const response = await axios.get<any>(
				"http://localhost:3001/users"
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
