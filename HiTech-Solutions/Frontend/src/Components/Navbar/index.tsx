import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaGlobe, FaSearch } from "react-icons/fa";

import Français from "../../Assets/Flags/fr.png";
import Nederlands from "../../Assets/Flags/nl.png";
import English from "../../Assets/Flags/uk.png";
import Logo from "../../Assets/ll1.png";

interface Country {
	code: string;
	title: string;
}

const countryIcons: { [key: string]: any } = {
	FR: Français,
	EN: English,
	NL: Nederlands,
};

const NavBar: React.FC = () => {
	const [countries] = useState<Country[]>([
		{ code: "FR", title: "Français" },
		{ code: "EN", title: "English" },
		{ code: "NL", title: "Nederlands" },
	]);

	return (
		<Navbar
			expand="lg"
			fixed="top"
			style={{
				backgroundColor: "#3991b47c",
				backdropFilter: "blur(10px)",
			}}
		>
			<Container fluid>
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
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll" style={{}}>
					<Nav
						className="me-auto my-2 my-lg-1 mx-auto"
						navbarScroll
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Nav.Link
							href="/"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
							}}
						>
							Accueil
						</Nav.Link>
						<NavDropdown
							style={{
								display: "flex",
							}}
							title={
								<span
									style={{
										color: "white",
										fontWeight: "bold",
									}}
								>
									Services
								</span>
							}
							id="nav-dropdown-services"
						>
							<NavDropdown.Item href="/formation">
								Formations
							</NavDropdown.Item>
							<NavDropdown.Item href="/depannage">
								Dépannage
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link
							href="/contact"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
							}}
						>
							Contact
						</Nav.Link>
						<Nav.Link
							href="#help"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
							}}
						>
							À propos
						</Nav.Link>
					</Nav>
					<Form className="d-flex mx-auto justify-content-center align-items-center">
						<div className="mx-2">
							<FaSearch />
						</div>

						<Form.Control
							type="search"
							placeholder="Recherche"
							className="me-3 mr-100 w-75"
							aria-label="Search"
							style={{
								minWidth: "350px",
								borderRadius: "20px",
								border: "none",
								backgroundColor: "#ffffffd2",
							}}
						/>
					</Form>
					<NavDropdown
						title={<FaGlobe />}
						id="navbarScrollingDropdown"
						style={{ fontSize: "20px", padding: "5px" }}
					>
						{countries.map((country) => (
							<NavDropdown.Item
								href={`#${country.code}`}
								key={country.code}
							>
								<img
									src={countryIcons[country.code]}
									alt={country.title}
									style={{
										width: "20px",
										marginRight: "5px",
									}}
								/>
								{country.title}
							</NavDropdown.Item>
						))}
					</NavDropdown>
					<Nav className="mx-3">
						<Nav.Link href="/login">
							<Button
								style={{
									backgroundColor: "#50b2d8",
									border: "none",
								}}
							>
								Connexion
							</Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
