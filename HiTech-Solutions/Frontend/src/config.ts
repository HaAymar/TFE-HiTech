export const BE_URL =
	process.env.NODE_ENV === "production"
		? "https://hitech-solutions.com:3001/api/"
		: "http://localhost:3001/api/";
