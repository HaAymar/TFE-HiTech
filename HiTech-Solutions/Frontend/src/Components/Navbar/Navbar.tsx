import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaGlobe } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

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
		<Navbar expand="lg" className="bg-secondary" fixed="top">
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
					<Nav className="me-auto my-2 my-lg-2 mx-auto" navbarScroll>
						<Nav.Link
							href="#Home"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
								paddingTop: "1%",
							}}
						>
							Home
						</Nav.Link>
						<Nav.Link
							href="#services"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
								paddingTop: "1%",
							}}
						>
							Services
						</Nav.Link>
						<Nav.Link
							href="#contact"
							className="mx-3"
							style={{
								fontWeight: "bold",
								color: "white",
								paddingTop: "1%",
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
								paddingTop: "1%",
							}}
						>
							About Us
						</Nav.Link>
					</Nav>
					<Form className="d-flex mx-auto justify-content-center align-items-center">
						<div className="mx-2">
							<FaSearch />
						</div>

						<Form.Control
							type="search"
							placeholder="Search"
							className="me-3 mr-100 w-75" // Ajout de la classe w-75
							aria-label="Search"
							style={{
								minWidth: "350px",
								borderRadius: "20px",
								border: "none",
								backgroundColor: "#cac8c8d3",
							}}
						/>
						<Button variant="outline-light">Search</Button>
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
						<Nav.Link href="#login">Connexion</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
