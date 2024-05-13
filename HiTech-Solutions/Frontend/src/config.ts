export const BE_URL =
	process.env.NODE_ENV === "production"
		? "https://hitech-backend.azurewebsites.net:3001/api/"
		: "http://localhost:3001/api/";
