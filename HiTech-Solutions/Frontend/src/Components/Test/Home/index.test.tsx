import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../../Home/index";

describe("Home Component", () => {
	it("renders the welcome message", () => {
		render(<Home />);
		expect(
			screen.getByText(/Bienvenue sur HiTech-Solutions/i)
		).toBeInTheDocument();
	});

	it("renders the mission statement", () => {
		render(<Home />);
		expect(screen.getByText(/Notre Mission/i)).toBeInTheDocument();
		expect(
			screen.getByText(
				/Notre objectif est de promouvoir les technologies de l'information et de la communication/i
			)
		).toBeInTheDocument();
	});

	it("button click should show more information", () => {
		render(<Home />);
		const button = screen.getByRole("button", { name: /En savoir plus/i });
		userEvent.click(button);
	});

	it("checks for the correct image being displayed", () => {
		render(<Home />);
		const img = screen.getByAltText("About us") as HTMLImageElement;
		expect(img.src).toContain("pro.webp");
	});
});
