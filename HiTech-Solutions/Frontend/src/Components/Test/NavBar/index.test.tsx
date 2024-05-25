import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavBar from "../../NavBar";

describe("NavBar Component", () => {
	it("renders the NavBar with logo and title", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(
			screen.getByAltText("Logo HiTech-Solutions")
		).toBeInTheDocument();
		expect(screen.getByText("HiTech-Solutions")).toBeInTheDocument();
	});

	it("renders the navigation links", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByText("Accueil")).toBeInTheDocument();
		expect(screen.getByText("Services")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();
		expect(screen.getByText("À propos")).toBeInTheDocument();
	});

	it("renders the language dropdown with initial selected language", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByText("(FR)")).toBeInTheDocument();
	});

	it("changes language when a new language is selected", async () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
	});

	it("renders the search bar", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByPlaceholderText("Recherche")).toBeInTheDocument();
	});

	it("renders the login button", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByText("Connexion")).toBeInTheDocument();
	});
});
