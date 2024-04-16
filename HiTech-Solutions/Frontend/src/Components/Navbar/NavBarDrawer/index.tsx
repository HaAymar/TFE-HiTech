import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Logo from "../../../Assets/ll1.png"; // Assurez-vous que le chemin est correct

interface NavbarProps {
	customStyle: React.CSSProperties;
}

const NavBarDrawer: React.FC<NavbarProps> = ({ customStyle = {} }) => {
	const defaultStyle: React.CSSProperties = {
		backgroundColor: "#245b70e6",
	};
	const combinedStyle = { ...defaultStyle, ...customStyle };
	return (
		<Navbar expand="lg" fixed="top" style={combinedStyle}>
			<Container fluid>
				<Navbar.Toggle aria-controls="navbarScroll" />

				<Nav className="me-auto">
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "10px",
						}}
					>
						<img src={Logo} alt="Logo HiTech-Solutions" />
						<h6
							style={{
								color: "#33364D",
								fontWeight: "bold",
								fontFamily: "cursive",
							}}
						>
							HiTech-Solutions
						</h6>
					</div>
				</Nav>

				<Nav>
					<Nav.Link href="/">
						<Button
							style={{
								backgroundColor: "#50b2d8",
								border: "none",
							}}
						>
							Déconnexion
						</Button>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBarDrawer;
