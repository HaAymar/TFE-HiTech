import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

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
					maxWidth: "100%",
				}}
			>
				<Row style={{ marginBottom: "20px" }}>
					<Col xs={12} md={4}>
						<h5 className="contentTitle">Localisation</h5>
						<p className="footerSize">Rue des Glands 43 </p>
						<p className="footerSize">1190 Forest</p>
						<p className="footerSize">Bruxelles, Belgique</p>
						<h5 className="contentTitle">Numéro de téléphone</h5>
						<p className="footerSize">+32 456 7890</p>

						<h5 className="contentTitle">Suivez nous</h5>
						<a
							href="https://facebook.com"
							aria-label="Facebook"
							style={{ color: "white" }}
							className="footerIcon"
						>
							<FaFacebook />
						</a>
						<a
							href="https://instagram.com"
							aria-label="Instagram"
							style={{ margin: "0 10px", color: "white" }}
							className="footerIcon"
						>
							<FaInstagram />
						</a>
						<a
							href="https://twitter.com"
							aria-label="Twitter"
							style={{ color: "white" }}
							className="footerIcon"
						>
							<RiTwitterXLine />
						</a>
					</Col>
					<Col xs={12} md={4}>
						<h5 className="contentTitle">Contact</h5>
						<p className="footerSize">
							Email: admin@hitchsolutions.be
						</p>
						<h5 className="contentTitle">Services</h5>
						<p className="footerSize">
							Centre de formation pour les demandeurs d'emplois
						</p>
						<p className="footerSize">Service de dépannage</p>
					</Col>
					<Col xs={12} md={4}>
						<h5 className="contentTitle">Restons connectés</h5>
						<p className="footerSize">
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
