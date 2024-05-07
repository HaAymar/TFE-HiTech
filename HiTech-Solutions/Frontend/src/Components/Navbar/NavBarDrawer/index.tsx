import React from "react";
import {
	Button,
	Container,
	Nav,
	Navbar,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { IoLogOut } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../Assets/Home/logoo.svg"; // Assurez-vous que le chemin est correct

interface NavbarProps {
	customStyle?: React.CSSProperties;
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

	const handleLogout = () => {
		console.log("Déconnexion utilisateur");
		navigate("/login");
	};

	return (
		<Navbar expand="lg" fixed="top" style={combinedStyle}>
			<Container fluid>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "10px",
							}}
						>
							<img
								src={Logo}
								alt="Logo HiTech-Solutions"
								style={{ width: "40px", height: "40px" }}
							/>
							<h6
								style={{
									color: "#272a3e",
									fontWeight: "bold",
									fontFamily: "cursive",
									fontSize: "17px",
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
									<Tooltip>
										Cliquez pour vous déconnecter
									</Tooltip>
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
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarDrawer;
