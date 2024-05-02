import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Assurez-vous que le style .small-progress-bar est défini ici

import React, { useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Image,
	ListGroup,
	ProgressBar,
	Row,
} from "react-bootstrap";
import Calendar from "react-calendar";
import { AiOutlineSchedule } from "react-icons/ai";
import { CgLoadbar } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { PiCertificateFill } from "react-icons/pi";
import { useRecoilValue } from "recoil";

import Fof from "../../Assets/Student/myPhoto.png";
import NavBar from "../Navbar/NavBarDrawer/index";
import { userNameState } from "../Stores/nameUser";

// Interfaces pour les données structurées
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

const formations: Formation[] = [
	{
		id: 1,
		nom: "Administration systéme",
		cours: [
			{
				id: 101,
				titre: "DNS",
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
						passe: false,
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
				titre: "  Web",
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
			{
				id: 104,
				titre: "Linux",
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
						passe: false,
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
				id: 105,
				titre: "Docker",
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
						passe: false,
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

const StudentPage: React.FC = () => {
	const user = useRecoilValue(userNameState);

	const [selectedCourse, setSelectedCourse] = useState<Cours | null>(null);
	const isFormationComplete = false;
	const handleCourseClick = (course: Cours) => {
		setSelectedCourse(course);
	};

	const calculateSuccessRate = (interrogations: Interrogation[]): number => {
		const totalTests = interrogations.length;
		const passedTests = interrogations.filter((test) => test.passe).length;
		return totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
	};

	const getProgressBarColor = (
		passedTests: number,
		totalTests: number
	): string => {
		const percentage = (passedTests / totalTests) * 100;
		if (percentage >= 75) {
			return "success";
		} else if (percentage >= 50) {
			return "warning";
		} else {
			return "danger";
		}
	};
	const styleStudent: React.CSSProperties = {
		backgroundColor: "rgba(36, 91, 112, 0.9)",
	};
	const handleDownloadCertificate = () => {
		console.log("Téléchargement du certificat...");
	};

	return (
		<div className="scrollPage">
			<NavBar customStyle={styleStudent} />
			<Container fluid className="student">
				<Container className="studentContent" style={{ width: "100%" }}>
					<div></div>
					<Row
						style={{
							display: "flex",
							gap: "5%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Col md={3} className="mb-2 profile-column">
							<div className="profile-header">
								<Image
									src={Fof}
									roundedCircle
									style={{ width: "150px", height: "100px" }}
								/>
								<h4>
									<strong>Bonjour, {user}</strong>
								</h4>
								<p>Formation en Administration Système</p>
								<div className="certificate-section">
									<PiCertificateFill className="certificate-icon" />
									<strong>Certificat de fréquentation</strong>
								</div>
								{isFormationComplete ? (
									<>
										<Button
											variant="success"
											onClick={handleDownloadCertificate}
										>
											Télécharger Certificat{" "}
											<FaDownload />
										</Button>
										<p>
											Votre certificat est prêt à être
											téléchargé. Félicitations pour avoir
											complété votre formation !
										</p>
									</>
								) : (
									<Alert variant="warning">
										Votre certificat n'est pas encore
										disponible. Veuillez compléter tous les
										cours et évaluations requis pour obtenir
										votre certificat.
									</Alert>
								)}
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "25px",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "10px",
										alignItems: "center",
									}}
								>
									<strong>Mes emails</strong>{" "}
									<Button
										style={{
											border: "none",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "3px",
											width: "100%",
											backgroundColor: "#40b9af",
										}}
									>
										<IoIosMail />
										<div>Répértoire</div>
									</Button>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "10px",
										alignItems: "center",
									}}
								>
									<strong>Mon horaire</strong>{" "}
									<Button
										style={{
											border: "none",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "3px",
											width: "100%",
											backgroundColor: "#40b9af",
										}}
									>
										<AiOutlineSchedule />
										<div>Horaire</div>
									</Button>
								</div>
							</div>
						</Col>
						<Col md={3} className="mb-3 ">
							<div className="calendar-header">
								<FaBookOpen />
								<div>
									<h4>
										<strong>Mes cours</strong>{" "}
									</h4>{" "}
								</div>
							</div>

							<ListGroup className="mb-3 listCourse">
								{formations
									.flatMap((formation) => formation.cours)
									.map((course) => (
										<ListGroup.Item
											action
											key={course.id}
											onClick={() =>
												handleCourseClick(course)
											}
											style={{
												backgroundColor:
													selectedCourse?.id ===
													course.id
														? "#3991b47c"
														: "",
												color:
													selectedCourse?.id ===
													course.id
														? "white"
														: "",
											}}
										>
											{course.titre}
										</ListGroup.Item>
									))}
							</ListGroup>

							<div className="calendar-header">
								<FaCalendarAlt />
								<div>
									<h5>
										<strong>
											Calendrier pour les tests{" "}
										</strong>
									</h5>{" "}
								</div>
							</div>
							<Calendar className="calendar" />
						</Col>
						<Col md={4} className="mb-3">
							{selectedCourse && (
								<div className="contentCours">
									<div className="calendar-header">
										<div>
											<h4>
												<strong>
													{selectedCourse.titre}
												</strong>
											</h4>
										</div>
									</div>
									<div className="d-flex align-items-center mt-3">
										<div>
											<h5>
												<strong>
													Score:{" "}
													{selectedCourse.interrogations &&
														`${calculateSuccessRate(
															selectedCourse.interrogations
														).toFixed(2)}%`}
												</strong>
											</h5>
										</div>
										<ProgressBar
											className="mb-2"
											style={{ width: "150px" }}
											now={
												selectedCourse.interrogations
													? calculateSuccessRate(
															selectedCourse.interrogations
													  )
													: 0
											}
											variant={
												selectedCourse.interrogations
													? getProgressBarColor(
															selectedCourse.interrogations.filter(
																(i) => i.passe
															).length,
															selectedCourse
																.interrogations
																.length
													  )
													: "info"
											}
											label={`${
												selectedCourse.interrogations
													? calculateSuccessRate(
															selectedCourse.interrogations
													  ).toFixed(0)
													: 0
											}%`}
										/>
									</div>
									<div className="detailsTest">
										{selectedCourse.interrogations.map(
											(evaluation, index) => (
												<Col
													key={index}
													md={9}
													className="mb-4"
												>
													<h5>
														<strong>
															{evaluation.titre}
														</strong>{" "}
														{evaluation.passe ? (
															<FaCheck
																style={{
																	color: "green",
																}}
															/>
														) : (
															<CgLoadbar
																style={{
																	color: "grey",
																}}
															/>
														)}
													</h5>
													<p>
														{evaluation.description}
													</p>
													<p>
														Date: {evaluation.date}
													</p>
												</Col>
											)
										)}
									</div>
								</div>
							)}
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
};

export default StudentPage;
