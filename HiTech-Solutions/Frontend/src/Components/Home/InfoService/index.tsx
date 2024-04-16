import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const OurServices = () => {
	return (
		<>
			<Container
				className="service-section"
				style={{
					marginTop: "40px",
					width: "900px",
				}}
			>
				<h1 style={{ paddingBottom: "30px", fontWeight: "600" }}>
					Nos Services
				</h1>
				<h4
					style={{
						fontWeight: "500",
						color: "#33364D",
						// marginTop: "20px",
						marginBottom: "30px",
						fontFamily: "Georgia, serif",
					}}
				>
					Innovation et support à votre portée, chaque jour.
				</h4>
				<Row style={{ gap: "50px" }}>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#0bb6e0" }}>
							Formation en Informatique
						</h2>
						<p>
							Vous souhaitez vous former ou perfectionner vos
							compétences en informatique pour décrocher le
							travail de vos rêves ? Notre programme de formation
							en technologie est conçu pour vous équiper des
							compétences nécessaires dans un monde numérique en
							constante évolution.
						</p>
						<Button
							variant="info"
							style={{ marginTop: "10px", color: "white" }}
						>
							Lancez-vous
						</Button>
					</Col>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#0bb6e0" }}>
							Dépannage Informatique
						</h2>
						<p>
							Bloqué sur une tâche ou confronté à un problème
							technique ? Notre équipe de dépannage informatique
							est là pour vous aider rapidement. Nous intervenons
							pour résoudre vos problèmes et vous assurer une
							continuité sans souci de vos activités
							informatiques.
						</p>
						<Button
							variant="info"
							style={{ marginTop: "10px", color: "white" }}
						>
							Lancez-vous
						</Button>
					</Col>
					<Col className="service-box">
						<h2 style={{ fontWeight: "600", color: "#0bb6e0" }}>
							Support et expertise IT
						</h2>
						<p>
							Besoin d'un avis expert pour optimiser vos systèmes
							informatiques ou développer de nouvelles solutions ?
							Nos consultants sont à votre disposition pour
							analyser vos besoins spécifiques et proposer des
							stratégies personnalisées qui propulseront votre
							entreprise vers l'avant.
						</p>
						<Button
							variant="info"
							style={{ marginTop: "10px", color: "white" }}
						>
							Lancez-vous
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default OurServices;
