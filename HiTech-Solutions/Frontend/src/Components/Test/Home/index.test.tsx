import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../../Home/index";

describe("Home Component", () => {
	it("renders the welcome message", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);
		expect(
			screen.getByText(/Bienvenue sur HiTech-Solutions/i)
		).toBeInTheDocument();
	});

	it("renders the mission statement", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);
		expect(screen.getByText(/Notre Mission/i)).toBeInTheDocument();
		expect(
			screen.getByText(
				/Notre objectif est de promouvoir les technologies de l'information et de la communication/i
			)
		).toBeInTheDocument();
	});

	it("button click should show more information", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);
		const button = screen.getByRole("button", { name: /En savoir plus/i });
		userEvent.click(button);
		// Ajoutez ici les assertions nécessaires pour vérifier ce qui doit se passer après le clic
	});

	it("checks for the correct image being displayed", () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);
		const img = screen.getByAltText("About us") as HTMLImageElement;
		expect(img.src).toContain("mission.png"); // Assurez-vous que le nom de l'image est correct
	});
});
