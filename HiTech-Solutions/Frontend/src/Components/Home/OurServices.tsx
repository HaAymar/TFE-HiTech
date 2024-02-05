import "./OurServices.css"; // Assurez-vous de créer un fichier CSS pour styliser votre page
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

// Importez votre composant NavBar

const OurServices = () => {
	return (
		<>
			<Container
				className="service-section"
				style={{
					backgroundColor: "grey",
					marginTop: "40px",
					width: "900px",
				}}
			>
				<h1 style={{ paddingBottom: "30px", fontWeight: "600" }}>
					Our Services
				</h1>
				<Row style={{ gap: "50px" }}>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#1695c7" }}>
							Formation en Technology
						</h2>
						<p>
							Lorem ipsum dolor sit amet techno magna aliquam dom
							design.
						</p>
					</Col>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#1695c7" }}>
							Service de dépannage IT
						</h2>
						<p>
							Lorem ipsum dolor sit amet techno magna aliquam dom
							design.
						</p>
					</Col>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#1695c7" }}>
							Conseil en Informatique
						</h2>
						<p>
							Lorem ipsum dolor sit amet techno magna aliquam dom
							design.
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default OurServices;
