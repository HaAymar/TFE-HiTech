import "./style.css";

import React from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";

type CourseProgress = {
	courseName: string;
	percentage: number;
};

const coursesProgress: CourseProgress[] = [
	{ courseName: "Linux", percentage: 50 },
	{ courseName: "Configuration des serveurs", percentage: 70 },
	{ courseName: "Réseaux", percentage: 80 },
	{ courseName: "Déploiement continue", percentage: 60 },
	{ courseName: "Configuration service mail", percentage: 70 },
];

const studentPage: React.FC = () => {
	return (
		<Container className="contentStudent">
			<Row>
				<Col>
					<h4>Cours</h4>
					{coursesProgress.map((course) => (
						<Row key={course.courseName}>
							<Col xs={8}>{course.courseName}</Col>
							<Col xs={2}>
								<ProgressBar
									now={course.percentage}
									label={`${course.percentage}%`}
								/>
							</Col>
						</Row>
					))}
				</Col>
			</Row>
		</Container>
	);
};

export default studentPage;
