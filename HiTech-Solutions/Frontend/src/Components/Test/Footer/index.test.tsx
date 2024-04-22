import React from "react";

import { render, screen } from "@testing-library/react";

import Footer from "../../Footer/index"; // Update the import path as necessary

describe("Footer Component", () => {
	it("should render contact information correctly", () => {
		render(<Footer />);

		expect(screen.getByText(/localisation/i)).toBeInTheDocument();
		expect(screen.getByText(/Rue des Glands 43/i)).toBeInTheDocument();
		expect(screen.getByText(/1190 Forest/i)).toBeInTheDocument();
		expect(screen.getByText(/Bruxelles, Belgique/i)).toBeInTheDocument();
		expect(screen.getByText(/\+32 456 7890/i)).toBeInTheDocument();

		expect(
			screen.getByText(/admin@hitchsolutions.be/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/Centre de formation pour les demandeurs d'emplois/i
			)
		).toBeInTheDocument();
		expect(screen.getByText(/Service de dépannage/i)).toBeInTheDocument();

		const facebook = screen.getByRole("link", { name: "Facebook" });
		expect(facebook).toHaveAttribute("href", "https://facebook.com");

		const instagram = screen.getByRole("link", { name: "Instagram" });
		expect(instagram).toHaveAttribute("href", "https://instagram.com");

		const twitter = screen.getByRole("link", { name: "Twitter" });
		expect(twitter).toHaveAttribute("href", "https://twitter.com");

		expect(
			screen.getByText(
				/© \d{4} ASBL HiTech-Solutions. Tous droits réservés. \| Protection des données avec le RGPD/i
			)
		).toBeInTheDocument();
	});
});
