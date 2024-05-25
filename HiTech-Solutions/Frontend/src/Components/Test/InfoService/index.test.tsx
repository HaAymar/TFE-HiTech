import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OurServices from "../../Home/InfoService";

describe("OurServices Component", () => {
	it("renders the main heading", () => {
		render(<OurServices />);
		expect(screen.getByText("Nos Services")).toBeInTheDocument();
	});

	it("renders the subheading", () => {
		render(<OurServices />);
		expect(
			screen.getByText(
				"Innovation et support à votre portée, chaque jour."
			)
		).toBeInTheDocument();
	});

	it("renders the service sections with correct titles", () => {
		render(<OurServices />);
		expect(
			screen.getByText("Formation en Informatique")
		).toBeInTheDocument();
		expect(screen.getByText("Dépannage Informatique")).toBeInTheDocument();
		expect(screen.getByText("Support et expertise IT")).toBeInTheDocument();
	});

	it("renders the service descriptions", () => {
		render(<OurServices />);
		expect(
			screen.getByText(
				/Vous souhaitez vous former ou perfectionner vos compétences en informatique/i
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Bloqué sur une tâche ou confronté à un problème technique/i
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Besoin d'un avis expert pour optimiser vos systèmes informatiques/i
			)
		).toBeInTheDocument();
	});

	it("renders the buttons with correct text", () => {
		render(<OurServices />);
		const buttons = screen.getAllByRole("button", { name: /Lancez-vous/i });
		expect(buttons).toHaveLength(3);
	});

	it("buttons are clickable", () => {
		render(<OurServices />);
		const buttons = screen.getAllByRole("button", { name: /Lancez-vous/i });
		buttons.forEach((button) => {
			userEvent.click(button);
		});
	});
});
