import "./style.css";

import React from "react";
import { Accordion, Form } from "react-bootstrap";
import { Container, ProgressBar } from "react-bootstrap";

import NavBar from "../Navbar/NavBarDrawer/index";

// type CourseProgress = {
// 	courseName: string;
// 	percentage: number;
// };
interface Interrogation {
	id: number;
	titre: string;
	description: string;
	date: string;
	cotation: number;
	passe: boolean;
}

interface Cours {
	id: number;
	titre: string;
	interrogations: Interrogation[];
}

interface Formation {
	id: number;
	nom: string;
	cours: Cours[];
}

const studentPage: React.FC = () => {
	const getProgressBarColor = (passed: number, total: number): string => {
		const percentage = (passed / total) * 100;
		if (percentage === 100) {
			return "success";
		} else if (percentage >= 50) {
			return "warning";
		} else {
			return "danger";
		}
	};
	const calculateSuccessRate = (interrogations: Interrogation[]): number => {
		const total = interrogations.length;
		const passed = interrogations.filter((interro) => interro.passe).length;
		return total > 0 ? (passed / total) * 100 : 0;
	};
	const formations: Formation[] = [
		{
			id: 1,
			nom: "Administration systéme",
			cours: [
				{
					id: 101,
					titre: "Config DNS",
					interrogations: [
						{
							id: 1001,
							titre: "Test 1",
							description: "Intro à la programmation",
							date: "2023-04-01",
							cotation: 20,
							passe: false,
						},
						{
							id: 1002,
							titre: "Test 2",
							description: "Structures de données",
							date: "2023-04-15",
							cotation: 20,
							passe: false,
						},
						{
							id: 1003,
							titre: "Test 3",
							description: "Algorithmes avancés",
							date: "2023-04-29",
							cotation: 20,
							passe: true,
						},
						{
							id: 1004,
							titre: "Test 4",
							description: "Test Final",
							date: "2023-04-29",
							cotation: 20,
							passe: false,
						},
					],
				},
				{
					id: 102,
					titre: "Config Web",
					interrogations: [
						{
							id: 2001,
							titre: "Test 1",
							description: "Fondamentaux des réseaux",
							date: "2023-05-01",
							cotation: 20,
							passe: true,
						},
						{
							id: 2002,
							titre: "Test 2",
							description: "Protocoles de communication",
							date: "2023-05-15",
							cotation: 20,
							passe: true,
						},
						{
							id: 2003,
							titre: "Test 3",
							description: "Sécurité des réseaux",
							date: "2023-05-29",
							cotation: 20,
							passe: false,
						},
					],
				},
				{
					id: 103,
					titre: "Réseaux",
					interrogations: [
						{
							id: 2001,
							titre: "Test 1",
							description: "Fondamentaux des réseaux",
							date: "2023-05-01",
							cotation: 20,
							passe: true,
						},
						{
							id: 2002,
							titre: "Test 2",
							description: "Protocoles de communication",
							date: "2023-05-15",
							cotation: 20,
							passe: true,
						},
						{
							id: 2003,
							titre: "Test 3",
							description: "Sécurité des réseaux",
							date: "2023-05-29",
							cotation: 20,
							passe: true,
						},
					],
				},
			],
		},
	];

	const styleStudent: React.CSSProperties = {
		backgroundColor: "rgba(36, 91, 112, 0.9)",
	};

	return (
		<div className="scrollPage">
			<NavBar customStyle={styleStudent} />
			<Container
				className="student-page-container contentStudent"
				style={{ width: "50%" }}
			>
				<Accordion defaultActiveKey="0">
					{formations.map((formation, indexFormation) => (
						<Accordion.Item
							eventKey={`${indexFormation}`}
							key={formation.id}
						>
							<Accordion.Header className="custom-accordion-header">
								{formation.nom}
							</Accordion.Header>
							<Accordion.Body className="custom-accordion-body">
								{formation.cours.map((cour) => (
									<Accordion key={cour.id}>
										<Accordion.Item
											eventKey={`cour-${cour.id}`}
										>
											<Accordion.Header>
												{cour.titre}
											</Accordion.Header>
											<Accordion.Body className="custom-accordion-body">
												{cour.interrogations.map(
													(interrogation) => (
														<Form
															key={
																interrogation.id
															}
														>
															<h5>
																<strong>
																	{
																		interrogation.titre
																	}
																</strong>
															</h5>
															<p>
																{
																	interrogation.description
																}
															</p>
															<p>
																{
																	interrogation.date
																}{" "}
																- /
																{
																	interrogation.cotation
																}
															</p>
															<Form.Check
																type="radio"
																label="Interrogation passée"
																checked={
																	interrogation.passe
																}
																onChange={(
																	e
																) => {
																	/* handle change */
																}}
															/>
														</Form>
													)
												)}
												<ProgressBar
													style={{ width: "150px" }}
													now={calculateSuccessRate(
														cour.interrogations
													)}
													variant={getProgressBarColor(
														cour.interrogations.filter(
															(i) => i.passe
														).length,
														cour.interrogations
															.length
													)}
													label={`${calculateSuccessRate(
														cour.interrogations
													).toFixed(0)}%`}
												/>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								))}
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			</Container>
		</div>
	);
};

export default studentPage;
