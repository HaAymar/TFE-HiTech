import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import admin from '../../Assets/Services/admin.jpeg';
import { fetchFormations } from '../Stores/formationsState'; // Assurez-vous que le chemin d'importation est correct

const Services: React.FC = () => {
	const formations = useRecoilValue(fetchFormations);

	return (
		<Container style={{ width: "1000px" }}>
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
					<Col
						key={formation.id}
						md={4}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Card
							className="h-100"
							style={{
								display: "flex",

								width: "250px",
							}}
						>
							<Card.Img variant="top" src={admin} />
							<Card.Body>
								<Card.Title>{formation.name}</Card.Title>
								<Card.Text>{formation.description}</Card.Text>
								<br />
								<div>
									<Link
										to="/path-to-formation-details"
										className="read-more-link"
									>
										Lire Plus
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Services;
