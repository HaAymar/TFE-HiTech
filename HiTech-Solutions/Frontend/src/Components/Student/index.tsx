import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import "moment/locale/fr";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styCalendar.css";

import moment from "moment";
import React, { useState } from "react";
import { Calendar, Event, momentLocalizer, Views } from "react-big-calendar";
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
import { AiOutlineSchedule } from "react-icons/ai";
import { CgLoadbar } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { IoIosMail } from "react-icons/io";
import { PiCertificateFill } from "react-icons/pi";
import { useRecoilValue } from "recoil";

import Fof from "../../Assets/Student/profile.jpg";
import NavBar from "../Navbar/NavBarDrawer/index";
import { userNameState } from "../Stores/nameUser";

moment.locale("fr");
const localizer = momentLocalizer(moment);

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
	color: string;
	interrogations: Interrogation[];
}

interface Formation {
	id: number;
	nom: string;
	cours: Cours[];
}

interface CourseEvent extends Event {
	title: string;
	start: Date;
	end: Date;
	color: string;
}

const formations: Formation[] = [
	{
		id: 1,
		nom: "Tech PC et Réseaux",
		cours: [
			{
				id: 101,
				titre: "A/D_PC",
				color: "#ff7f7f",
				interrogations: [
					{
						id: 1001,
						titre: "Chapitre 1",
						description: "Intro à la programmation",
						date: "2024-04-01",
						cotation: 20,
						passe: false,
					},
					{
						id: 1002,
						titre: "Chapitre 2",
						description: "Structures de données",
						date: "2024-04-15",
						cotation: 20,
						passe: false,
					},
					{
						id: 1003,
						titre: "Chapitre 4",
						description: "Algorithmes avancés",
						date: "2024-04-29",
						cotation: 20,
						passe: false,
					},
					{
						id: 1004,
						titre: "Examen Final",
						description: "Test Final",
						date: "2024-04-28",
						cotation: 20,
						passe: false,
					},
				],
			},
			{
				id: 102,
				titre: "RL(LAN)",
				color: "#7f7fff",
				interrogations: [
					{
						id: 2001,
						titre: "Chapitre 1",
						description: "Fondamentaux des réseaux",
						date: "2024-05-01",
						cotation: 20,
						passe: true,
					},
					{
						id: 2002,
						titre: "Chapitre 2",
						description: "Protocoles de communication",
						date: "2024-05-15",
						cotation: 20,
						passe: true,
					},
					{
						id: 2003,
						titre: "Chapitre 3",
						description: "Sécurité des réseaux",
						date: "2024-05-29",
						cotation: 20,
						passe: false,
					},
				],
			},
			{
				id: 103,
				titre: "CONFIG_AVANCE",
				color: "#7fff7f",
				interrogations: [
					{
						id: 2001,
						titre: "Chapitre 1",
						description: "Fondamentaux des réseaux",
						date: "2024-05-02",
						cotation: 20,
						passe: true,
					},
					{
						id: 2002,
						titre: "Chapitre 2",
						description: "Protocoles de communication",
						date: "2024-05-14",
						cotation: 20,
						passe: true,
					},
					{
						id: 2003,
						titre: "Chapitre 3",
						description: "Sécurité des réseaux",
						date: "2024-05-9",
						cotation: 20,
						passe: true,
					},
				],
			},
			{
				id: 104,
				titre: "MEO(IPv4)",
				color: "#ffbf00",
				interrogations: [
					{
						id: 2001,
						titre: "Chapitre 1",
						description: "Fondamentaux des réseaux",
						date: "2024-05-10",
						cotation: 20,
						passe: true,
					},
					{
						id: 2002,
						titre: "Chapitre 2",
						description: "Protocoles de communication",
						date: "2024-05-17",
						cotation: 20,
						passe: false,
					},
					{
						id: 2003,
						titre: "Chapitre 3",
						description: "Sécurité des réseaux",
						date: "2024-06-1",
						cotation: 20,
						passe: false,
					},
				],
			},
			{
				id: 105,
				titre: "MEO(DNS)",
				color: "#00bfff",
				interrogations: [
					{
						id: 2001,
						titre: "Chapitre 1",
						description: "Fondamentaux des réseaux",
						date: "2024-05-11",
						cotation: 20,
						passe: true,
					},
					{
						id: 2002,
						titre: "Chapitre 2",
						description: "Protocoles de communication",
						date: "2024-06-02",
						cotation: 20,
						passe: false,
					},
					{
						id: 2003,
						titre: "Chapitre 3",
						description: "Sécurité des réseaux",
						date: "2024-05-24",
						cotation: 20,
						passe: true,
					},
				],
			},
		],
	},
];

const messages = {
	allDay: "Journée",
	previous: "Précédent",
	next: "Suivant",
	today: "Jour",
	month: "Mois",
	week: "Semaine",
	day: "Jour",
	agenda: "Agenda",
	date: "Date",
	time: "Heure",
	event: "Événement",
	noEventsInRange: "Aucun événement dans cette période.",
	showMore: (total: any) => `+ ${total} événement(s) supplémentaire(s)`,
};

const transformInterrogationsToEvents = (
	formations: Formation[]
): CourseEvent[] => {
	const events: CourseEvent[] = [];
	formations.forEach((formation) => {
		formation.cours.forEach((cours) => {
			cours.interrogations.forEach((interrogation) => {
				events.push({
					title: `${cours.titre}: ${interrogation.titre}`,
					start: new Date(interrogation.date),
					end: new Date(interrogation.date),
					color: cours.color,
				});
			});
		});
	});
	return events;
};

const myEventsList = transformInterrogationsToEvents(formations);

const Student: React.FC = () => {
	const eventStyleGetter = (
		event: CourseEvent,
		start: Date,
		end: Date,
		isSelected: boolean
	) => {
		const backgroundColor = event.color;
		const style = {
			backgroundColor,
			borderRadius: "5px",
			opacity: 0.8,
			color: "white",
			border: "0px",
			display: "block",
		};
		return {
			style: style,
		};
	};
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
	const cancelSelectedCourse = () => {
		setSelectedCourse(null);
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
				<Container className="studentContent" style={{ width: "90%" }}>
					<div></div>
					<Row
						style={{
							display: "flex",
							gap: "5%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Col md={3} className=" mb-3 profile-column">
							<div className="profile-header">
								<Image
									src={Fof}
									roundedCircle
									style={{
										width: "100px",
										height: "100px",
										paddingBottom: "5px",
									}}
								/>
								<h5
									style={{
										color: "navy",
										fontFamily: "Arial, sans-serif",
										textAlign: "center",
									}}
								>
									<strong>Bonjour, {user}</strong>
								</h5>
								<p
									style={{
										fontSize: "16px",
										fontStyle: "italic",
										textAlign: "center",
									}}
								>
									Formation en Administration Système
								</p>
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
						<Col md={3} className="mb-3">
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
								<FaBook />
								<div>
									<h4>
										<strong>Les modules</strong>{" "}
									</h4>{" "}
								</div>
							</div>

							<div
								className="moduleStudent"
								style={{
									backgroundColor: "#f7f7f7",
									padding: "20px",
									borderRadius: "10px",
									boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
								}}
							>
								<div>
									<p>
										Vous souhaitez voir votre progression
										dans vos cours ? Vous pouvez
										sélectionner le cours pour obtenir tous
										les détails concernant votre progression
										professionnelle.
									</p>
									<p>
										Consultez les modules dans le
										référentiel de l'établissement.
									</p>
								</div>

								<Button
									style={{
										border: "none",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "3px",
										width: "150px",
										backgroundColor: "#40b9af",
										color: "white",
									}}
								>
									<FaDiscord />
									<div>Modules</div>
								</Button>
							</div>
						</Col>
						<Col md={4} className="mb-3">
							{selectedCourse ? (
								<div className="contentCours">
									<div className="calendar-header">
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												gap: "50px",
											}}
										>
											<div
												style={{
													display: "flex",
													paddingTop: "5px",
												}}
											>
												<h4>
													<strong>
														{selectedCourse.titre}
													</strong>
												</h4>
											</div>

											<ImCancelCircle
												style={{
													color: "#a84334",
												}}
												onClick={cancelSelectedCourse}
											/>
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
							) : (
								<>
									<div style={{ paddingBottom: "18%" }}>
										<div className="calendar-header">
											<FaCalendarAlt />
											<div>
												<h5>
													<strong>
														Calendrier pour les
														tests{" "}
													</strong>
												</h5>{" "}
											</div>
										</div>
										<div className="custom-calendar">
											<Calendar
												localizer={localizer}
												events={myEventsList}
												startAccessor="start"
												endAccessor="end"
												style={{
													height: 400,
													width: "100%",
													backgroundColor: "white",
													borderRadius: "15px",
													padding: "2%",
												}}
												eventPropGetter={
													eventStyleGetter
												}
												views={[Views.MONTH]}
												defaultView={Views.MONTH}
												messages={messages}
											/>
										</div>
									</div>
								</>
							)}
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
};

export default Student;
