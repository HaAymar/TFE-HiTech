import "../Page 404/style.css";

import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import NavBar from "../Navbar/index";

const NotFoundPage: React.FC = () => {
	return (
		<>
			<NavBar />
			<Container
				className="pageError"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Row>
					<Col md={{ span: 6, offset: 3 }} className="text-center">
						<h4>En cours de développement ...</h4>
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default NotFoundPage;
