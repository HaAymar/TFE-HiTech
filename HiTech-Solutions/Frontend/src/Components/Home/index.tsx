import "./style.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

import Bg from "../../Assets/Home/pro.webp";
import Footer from "../Footer/index";
import NavBar from "../Navbar/index";
import OurServices from "./InfoService/index";

const Home = () => {
	return (
		<>
			<NavBar />
			<Container fluid className="main-banner">
				<Row>
					<Col>
						<div
							style={{
								borderLeft: "5px solid #0bb6e0",
								paddingLeft: "20px",
								marginBottom: "20px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<h1
								style={{
									color: "#0bb6e0",
									fontFamily: "Georgia, serif",
									fontSize: "2.8rem",
									marginBottom: "0.5em",
								}}
							>
								Bienvenue sur HiTech-Solutions
							</h1>
							<h4
								style={{
									fontSize: "1.6rem",
									fontWeight: "normal",
									color: "#333333",
									lineHeight: "1.6",
								}}
							>
								<strong>
									Découvrez nos services de formation en
									informatique pour les demandeurs d'emplois
									et nos solutions de dépannage IT.
								</strong>
							</h4>
							<Button
								variant="primary"
								className="mt-3"
								style={{
									padding: "15px",
									backgroundColor: "#0bb5e09e",
									border: "none",
									width: "220px",
									fontSize: "1.2rem",
								}}
							>
								En savoir plus{" "}
								<BsArrowRight
									style={{
										marginLeft: "5px",
										fontSize: "1.5rem",
									}}
								/>
							</Button>
						</div>
					</Col>
				</Row>
			</Container>

			<OurServices />
			<div className="bodyAbout">
				<Container
					className="about-section"
					style={{ maxWidth: "800px", margin: "auto" }}
				>
					<Row>
						<Col
							md={6}
							className="about-text"
							style={{
								padding: "15px",
								display: "flex",
								flexDirection: "column",
								gap: "20px",
								backgroundColor: "#f9f9f9",
								boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								borderRadius: "10px",
							}}
						>
							<h3
								style={{ color: "#0a6473", fontWeight: "bold" }}
							>
								Notre Mission
							</h3>
							<p style={{ fontSize: "16px", lineHeight: "1.6" }}>
								Notre objectif est de promouvoir les
								technologies de l'information et de la
								communication (TIC). Les activités qui
								constituent ce projet incluent :
							</p>
							<ul style={{ paddingLeft: "20px" }}>
								<li>
									Éducation en technologies informatiques,
									électroniques et de télécommunications (aux
									seniors et autres intéressés)
								</li>
								<li>Réduction de la fracture numérique</li>
								<li>
									Conceptions et exécutions de projets
									relatifs aux TICs
								</li>
								<li>
									Dépannage des équipements, réseaux
									informatiques et de télécommunications
								</li>
							</ul>
						</Col>
						<Col
							md={6}
							className="about-image"
							style={{
								padding: "20px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								overflow: "hidden",
								borderRadius: "10px",
							}}
						>
							<img
								src={Bg}
								alt="About us"
								style={{
									width: "100%",
									height: "auto",
									maxWidth: "500px",
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</>
	);
};

export default Home;
