import "./style.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavBar from "../Navbar/NavBarDrawer/index";

const NotFoundPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<NavBar />
			<Container
				className="pageError"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className="text-center">
						<h1>Oups! 404 😢</h1>
						<p>La page que vous recherchez semble introuvable !</p>
						<Button
							style={{
								backgroundColor: "#3991b4d1",
								border: "none",
							}}
							onClick={() => navigate("/")}
						>
							RENTRER A LA MAISON
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default NotFoundPage;
