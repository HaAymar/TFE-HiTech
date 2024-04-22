import React from "react";
import { Button, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoLogOut } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../Assets/ll1.png"; // Assurez-vous que le chemin est correct

interface NavbarProps {
	customStyle: React.CSSProperties;
}

const NavBarDrawer: React.FC<NavbarProps> = ({ customStyle = {} }) => {
	const defaultStyle: React.CSSProperties = {
		backgroundColor: "#245b70e6",
	};
	const combinedStyle = { ...defaultStyle, ...customStyle };
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const initials = searchParams.get("initials") || "";
	console.log("initials", initials);
	const handleLogout = () => {
		// Mettez ici votre logique de déconnexion
		console.log("Déconnexion utilisateur");
		navigate("/login"); // Rediriger vers la page de connexion
	};

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
					<Nav.Link>
						<Button
							style={{
								backgroundColor: "#50b2d8",
								border: "none",
							}}
						>
							{initials}{" "}
						</Button>
						<OverlayTrigger
							placement="bottom"
							overlay={
								<Tooltip>Cliquez pour vous déconnecter</Tooltip>
							}
						>
							<span
								onClick={handleLogout}
								style={{ cursor: "pointer" }}
							>
								<IoLogOut
									size={20}
									style={{
										marginLeft: "10px",
										color: "white",
									}}
								/>
							</span>
						</OverlayTrigger>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBarDrawer;
