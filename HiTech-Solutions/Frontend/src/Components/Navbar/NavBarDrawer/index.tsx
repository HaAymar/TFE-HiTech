import React from 'react';
import { Button, Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IoLogOut } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../../Assets/Home/logoo.svg';

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
				<Navbar.Brand
					href="#"
					style={{ display: "flex", alignItems: "center" }}
				>
					<img
						src={Logo}
						alt="Logo HiTech-Solutions"
						style={{ width: "40px", height: "40px" }}
					/>
					<span
						style={{
							color: "#272a3e",
							fontWeight: "bold",
							fontFamily: "cursive",
							marginLeft: "10px",
							fontSize: "15px",
						}}
					>
						HiTech-Solutions
					</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto"></Nav>
					<Nav>
						{" "}
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
								<Tooltip id="logout-tooltip">
									Cliquez pour vous déconnecter
								</Tooltip>
							}
						>
							<Button
								variant="link"
								onClick={handleLogout}
								style={{
									color: "white",
									display: "flex",
									alignItems: "center",
								}}
							>
								<IoLogOut
									size={20}
									style={{ marginRight: "5px" }}
								/>
							</Button>
						</OverlayTrigger>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarDrawer;
