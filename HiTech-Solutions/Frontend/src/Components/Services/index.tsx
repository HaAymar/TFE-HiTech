import "./style.css";

import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import admin from "../../Assets/Services/admin.jpeg";
import NavBar from "../Navbar/index";
import { fetchFormations } from "../Stores/formationsState";

const Services: React.FC = () => {
	const formations = useRecoilValue(fetchFormations);

	return (
		<div className="scrollBar">
			<NavBar />
			<Container
				style={{
					width: "100%",
					padding: "10px",
					overflow: "hidden",
				}}
				className="contentService"
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div>
						<h3>
							<strong>Découvrez nos formations</strong>{" "}
						</h3>
					</div>
				</div>
				<div className="infoService">
					{formations.map((formation) => (
						<Col
							className="mb-3"
							key={formation.id}
							md={2}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Card className="card" style={{ width: "100%" }}>
								<Card.Img variant="top" src={admin} />
								<Card.Body>
									<Card.Title className="card-title">
										{formation.name}
									</Card.Title>
									<Card.Text className="card-description">
										{formation.description}
									</Card.Text>
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
				</div>
			</Container>
		</div>
	);
};

export default Services;
