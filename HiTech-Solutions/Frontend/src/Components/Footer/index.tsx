import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Importing CSS Module

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
	return (
		<div className="contentFooter">
			<Container
				style={{
					backgroundColor: "#6c757d",
					color: "white",
					marginTop: "0px",
					paddingTop: "30px",
				}}
			>
				<Row style={{ marginBottom: "20px" }}>
					<h5>Our Address</h5>
					<p>Rue des Glands 43 </p>
					<p>1190 Forest</p>

					<h5>Phone Number</h5>
					<p>+32 456 7890</p>

					<h5>Follow Us</h5>
					<Col>
						<a
							href="https://facebook.com"
							style={{ color: "white" }}
						>
							<FaFacebook />
						</a>
						<a
							href="https://instagram.com"
							style={{ margin: "0 10px", color: "white" }}
						>
							<FaInstagram />
						</a>
						<a
							href="https://twitter.com"
							style={{ color: "white" }}
						>
							<FaTwitter />
						</a>
					</Col>
				</Row>
				<Row>
					<Col className="mt-4">
						<div className="footerContent">
							© {new Date().getFullYear()} ASBL HiTech-Solutions.
							All rights reserved.
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;
