import axios from "axios";
import { atom, selector } from "recoil";

export interface Formation {
	id: number;
	name: string;
	description: string;
	photo: File | null;
}

export interface CreateFormation {
	name: string;
	description: string;
	photo: string;
}

export const formationsState = atom<Formation[]>({
	key: "formationsState",
	default: [],
});

export const fetchFormations = selector({
	key: "fetchFormations",
	get: async () => {
		try {
			const response = await axios.get<Formation[]>(
				"http://localhost:3001/formations"
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
});
