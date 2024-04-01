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
						<div className="vertical-line">
							<h1
								style={{
									color: "#0bb6e0",
									fontFamily: "Georgia",
									fontSize: "2.8rem",
								}}
							>
								Bienvenue sur notre site Web HiTech-Solutions
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
									width: "200px",
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
			<div className="bodyAbout">
				<Container
					className="about-section"
					style={{ width: "  800px" }}
				>
					<Row>
						<Col
							md={6}
							className="about-text"
							style={{
								transition: "opacity 0.5s ease",
								display: "flex",
								flexDirection: "column",
								gap: "20px",
							}}
						>
							<h3>
								Nous fournissons une formation et une
								informatique de haute qualité services de
								dépannage
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur velit
								incididunt ut labore et dolore magna aliqua.
							</p>
							<Row>
								<Col>
									<h3>Notre Mission</h3>
									<p>
										Lorem ipsum dolor sit amet techno magna
										aliquam in design.
									</p>
								</Col>
								<Col>
									<h3>Notre Vision</h3>
									<p>
										Lorem ipsum dolor sit amet techno magna
										aliquam in design.
									</p>
								</Col>
							</Row>
							<Button
								style={{
									backgroundColor: "#60badd",
									width: "150px",
								}}
							>
								Découvrir plus
							</Button>
						</Col>
						<Col
							md={6}
							className="about-image"
							style={{ transition: "opacity 0.5s ease" }}
						>
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
