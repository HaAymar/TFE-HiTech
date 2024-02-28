import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import admin from "../../Assets/Services/admin.jpeg";
import { fetchFormations } from "../Stores/formationsState"; // Assurez-vous que le chemin d'importation est correct

const Services: React.FC = () => {
	const formations = useRecoilValue(fetchFormations);

	return (
		<Container>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h2>Découvrez nos formations</h2>
			</div>
			<Row>
				{formations.map((formation) => (
					<Col key={formation.id} md={4}>
						<Card className="h-100">
							<Card.Img variant="top" src={admin} />
							<Card.Body>
								<Card.Title>{formation.name}</Card.Title>
								<Card.Text>{formation.description}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Services;
