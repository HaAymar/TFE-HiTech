import axios from "axios";

const BASE_URL = `${BE_URL}courses`;

export const findByFormationName = async (name: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/nameFormation/${name}`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la récupération des données", error);
		throw error;
	}
};
