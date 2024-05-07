import "./style.css";

import React from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import admin from "../../Assets/Services/admin.jpeg";
import defaultImage from "../../Assets/Services/default.png";
import dev from "../../Assets/Services/dev.jpeg";
import elec from "../../Assets/Services/elec.jpg";
import telecom from "../../Assets/Services/telecom.jpg";
import NavBar from "../Navbar/index";
import { fetchFormations } from "../Stores/formationsState";

const Services: React.FC = () => {
	const formations = useRecoilValue(fetchFormations);

	const selectImage = (formationName: string) => {
		switch (formationName) {
			case "Admin réseaux":
				return admin;
			case "Dev web":
				return dev;
			case "Eléctronique":
				return elec;
			case "Télécom":
				return telecom;
			default:
				return defaultImage;
		}
	};

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
								<Card.Img
									variant="top"
									src={selectImage(formation.name)}
									style={{
										width: "100%",
										height: "150px",
										objectFit: "cover",
									}}
								/>
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
