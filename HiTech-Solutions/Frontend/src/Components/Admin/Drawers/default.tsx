import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { userNameState } from "../../Stores/nameUser";

const DefaultDrawer: React.FC = () => {
	const user = useRecoilValue(userNameState);
	return (
		<Container
			className="contentDefault"
			style={{
				width: "80%",
				height: "500px",
				backgroundColor: "#dadde0",
			}}
		>
			<Row className="justify-content-center pt-5">
				<Col md={6}>
					<Card className="text-center">
						<Card.Body>
							<Card.Title>
								<strong>Accueil</strong>
							</Card.Title>
							<Card.Text>
								Bonjour
								{user ? ` ${user}` : " Guest"}, bienvenue sur
								votre espace de travail personnalisé!
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DefaultDrawer;
