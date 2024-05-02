import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Importing CSS Module

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer: React.FC = () => {
	return (
		<div className="contentFooter">
			<Container
				style={{
					backgroundColor: "#3991b4",
					color: "white",
					marginTop: "0px",
					paddingTop: "30px",
					width: "800px",
				}}
			>
				<Row style={{ marginBottom: "20px" }}>
					<Col>
						<h5 style={{ fontWeight: "600", color: "white" }}>
							Localisation
						</h5>
						<p>Rue des Glands 43 </p>
						<p>1190 Forest</p>
						<p>Bruxelles, Belgique</p>
						<h5 style={{ fontWeight: "600", color: "white" }}>
							Numéro de téléphone
						</h5>
						<p>+32 456 7890</p>

						<h5 style={{ fontWeight: "600", color: "white" }}>
							Suivez nous
						</h5>
						<Col>
							<a
								href="https://facebook.com"
								aria-label="Facebook"
								style={{ color: "white" }}
							>
								<FaFacebook />
							</a>
							<a
								href="https://instagram.com"
								aria-label="Instagram"
								style={{ margin: "0 10px", color: "white" }}
							>
								<FaInstagram />
							</a>
							<a
								href="https://twitter.com"
								aria-label="Twitter"
								style={{ color: "white" }}
							>
								<RiTwitterXLine />
							</a>
						</Col>
					</Col>
					<Col>
						<h5 style={{ fontWeight: "600", color: "white" }}>
							Contact
						</h5>
						<p>Email: admin@hitchsolutions.be</p>
						<h5 style={{ fontWeight: "600", color: "white" }}>
							Services
						</h5>
						<p>Centre de formation pour les demandeurs d'emplois</p>
						<p>Service de dépannage</p>
					</Col>
					<Col>
						<h5 style={{ fontWeight: "600", color: "white" }}>
							Restons connectés
						</h5>
						<p>
							Pour plus d'informations, vous pouvez nous envoyer
							votre mail afin de vous enregistrer
						</p>
					</Col>
				</Row>
				<Row>
					<Col className="mt-4">
						<div className="footerContent">
							© {new Date().getFullYear()} ASBL HiTech-Solutions.
							Tous droits réservés. | Protection des données avec
							le RGPD
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;
