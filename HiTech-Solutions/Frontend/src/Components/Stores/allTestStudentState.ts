import axios from "axios";
import { atom, selector } from "recoil";

import { BE_URL } from "../../config";

interface TestInfo {
	studentName: string;
	studentSurname: string;
	courseName: string;
	validation: string;
}
export const allTestAtom = atom<TestInfo[]>({
	key: "allTestsAtom",
	default: [],
});

export const fetchAllTestStudent = selector({
	key: "fetchAllTestStudent",
	get: async () => {
		try {
			const response = await axios.get<any>(`${BE_URL}tests`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
