import "./HomePage.css"; // Assurez-vous de créer un fichier CSS pour styliser votre page
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";

import Bg from "../../Assets/Home/pro.webp";
import Footer from "../Footer/index";
import NavBar from "../Navbar/Navbar"; // Importez votre composant NavBar
import OurServices from "./OurServices";

const Home = () => {
	return (
		<>
			<NavBar />
			<Container fluid className="main-banner">
				<Row>
					<Col>
						<div className="vertical-line">
							<h1
								style={{
									color: "#0bb6e0",
									fontFamily: "Georgia",
									fontSize: "2.8rem",
								}}
							>
								Welcome to our Web Site HiTech-Solutions
							</h1>
							<h4 style={{ fontSize: "2rem" }}>
								Notre site propose plusieurs services dont, la{" "}
								<br />
								formation en informatique pour les demandeurs{" "}
								<br />
								d'emplois et service de dépannage en IT
							</h4>
							<Button
								variant="primary"
								className="me-5"
								style={{
									padding: "15px",
									backgroundColor: "#60badd",
									border: "none",
								}}
							>
								EN SAVOIR PLUS{" "}
								<span
									style={{
										marginLeft: "5px",
									}}
								>
									<BsArrowRight />
								</span>
							</Button>
						</div>
					</Col>
				</Row>
			</Container>

			<OurServices />
			<div className="body">
				<Container className="about-section">
					<Row>
						<Col
							md={6}
							className="about-text"
							style={{ transition: "opacity 0.5s ease" }}
						>
							<h3>
								We provide high-quality training and IT
								troubleshooting services
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur velit
								incididunt ut labore et dolore magna aliqua.
							</p>
							<Row>
								<Col>
									<h3>Our Mission</h3>
									<p>
										Lorem ipsum dolor sit amet techno magna
										aliquam in design.
									</p>
								</Col>
								<Col>
									<h3>Our Vision</h3>
									<p>
										Lorem ipsum dolor sit amet techno magna
										aliquam in design.
									</p>
								</Col>
							</Row>
							<Button variant="outline-primary">
								Discover More
							</Button>
						</Col>
						<Col
							md={6}
							className="about-image"
							style={{ transition: "opacity 0.5s ease" }}
						>
							{/* Assurez-vous d'ajouter les images dans votre dossier public ou de les importer */}
							<img src={Bg} alt="About us" />
						</Col>
					</Row>
				</Container>
			</div>

			<Footer />
		</>
	);
};

export default Home;
