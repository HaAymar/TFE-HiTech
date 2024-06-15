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
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdOutlineRemove } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { useRecoilValue } from "recoil";

import Fof from "../../Assets/Student/profile.jpg";
import NavBar from "../Navbar/NavBarDrawer/index";
import { fetchAllCourseTest } from "../Stores/allCourseTestState";
import { fetchCourseStudent } from "../Stores/formationStudentCourse";
import { userNameState } from "../Stores/nameUser";

moment.locale("fr");
const localizer = momentLocalizer(moment);

interface Test {
	testId: number;
	courseId: number;
	courseName: string;
	testName: string;
	testDate: string;
	description: string;
	cotation: string;
	validation: string;
	score: number;
	teacherId: number;
	courseTeacherId: number;
}

interface TestStudent {
	courseId: number;
	courseName: string;
	testId: number;
	testName: string;
	testDate: string;
	description: string;
	cotation: string;
	validation: string;
	score: number;
	teacherId: number;
	courseTeacherId: number;
}

interface GroupedTests {
	courseId: number;
	courseName: string;
	tests: TestStudent[];
}

interface CourseEvent extends Event {
	title: string;
	start: Date;
	end: Date;
	color?: string;
}

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

const Student: React.FC = () => {
	const testsCours = useRecoilValue(fetchAllCourseTest);
	const stuCours = useRecoilValue(fetchCourseStudent);
	const [showCalendar, setShowCalendar] = useState<boolean>(true);
	function groupTestsByCourse(student: Test[]): GroupedTests[] {
		const groupedByCourse: { [key: number]: GroupedTests } = {};

		student.forEach((test) => {
			if (!groupedByCourse[test.courseId]) {
				groupedByCourse[test.courseId] = {
					courseId: test.courseId,
					courseName: test.courseName,
					tests: [],
				};
			}

			groupedByCourse[test.courseId].tests.push(test);
		});

		return Object.values(groupedByCourse);
	}
	const groupedTests = groupTestsByCourse(testsCours);
	console.log("groupedTests", groupedTests);
	const today = new Date().toISOString().split("T")[0];
	const transformInterrogationsToEvents = (
		allTestCourses: GroupedTests[]
	): CourseEvent[] => {
		const events: CourseEvent[] = [];
		allTestCourses.forEach((course) => {
			course.tests.forEach((test) => {
				events.push({
					title: `${course.courseName}: ${test.testName}`,
					start: new Date(test.testDate),
					end: new Date(test.testDate),
				});
			});
		});
		return events;
	};

	const myEventsList = transformInterrogationsToEvents(groupedTests);

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

	const [selectedCourse, setSelectedCourse] = useState<TestStudent[] | null>(
		null
	);

	const [idSelect, setIDSelect] = useState<number>(0);
	const isFormationComplete = false;

	const handleCourseClick = (courseId: number) => {
		setShowCalendar(false);
		setIDSelect(courseId);
		const course = groupedTests.find(
			(course) => course.courseId === courseId
		);
		if (course && course.tests) {
			console.log("course.tests", courseId);
			setSelectedCourse(course.tests);
			return course.tests;
		} else {
			setSelectedCourse([]);
			return [];
		}
	};

	const cancelSelectedCourse = () => {
		setShowCalendar(true);
	};
	const calculateSuccessRate = (testStu: TestStudent[]): number => {
		const totalTests = testStu.length;
		const passedTests = testStu.filter(
			(test) => test.validation === "Yes"
		).length;

		return totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
	};

	const getProgressBarColor = (
		passedTests: number,
		totalTests: number
	): string => {
		const percentage = (passedTests / totalTests) * 100;
		console.log(passedTests, totalTests);
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
									Formation en Tech PC et Réseaux
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
								{stuCours.map((course) => (
									<ListGroup.Item
										action
										key={course.id}
										onClick={() =>
											handleCourseClick(course.id)
										}
										style={{
											backgroundColor:
												selectedCourse &&
												(selectedCourse.some(
													(test) =>
														test.courseId ===
														course.id
												) ||
													idSelect === course.id)
													? "#3991b47c"
													: "",
											color:
												selectedCourse &&
												(selectedCourse.some(
													(test) =>
														test.courseId ===
														course.id
												) ||
													idSelect === course.id)
													? "white"
													: "",
										}}
									>
										{course.name}
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
									href="https://discord.com/"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										border: "none",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "6px",
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
							{groupedTests && !showCalendar ? (
								<div className="contentCours">
									<div
										className="calendar-header"
										style={{
											display: "flex",

											gap: "50px",
										}}
									>
										<Button
											style={{
												backgroundColor: "#b33908",
												border: "none",
											}}
											onClick={cancelSelectedCourse}
										>
											Fermer
										</Button>
									</div>
									<div className="d-flex align-items-center mt-3">
										<div>
											<h5>
												<strong>
													Score:{" "}
													{selectedCourse &&
													selectedCourse.length > 0
														? `${calculateSuccessRate(
																selectedCourse
														  ).toFixed(2)}%`
														: "N/A"}
												</strong>
											</h5>
										</div>
										<ProgressBar
											className="mb-2"
											style={{ width: "150px" }}
											now={
												selectedCourse
													? calculateSuccessRate(
															selectedCourse
													  )
													: 0
											}
											variant={
												selectedCourse
													? getProgressBarColor(
															selectedCourse.filter(
																(test) =>
																	test.validation ===
																	"Yes"
															).length,
															selectedCourse.length
													  )
													: "info"
											}
											label={`${
												selectedCourse
													? calculateSuccessRate(
															selectedCourse
													  ).toFixed(0)
													: 0
											}%`}
										/>
									</div>
									<div className="detailsTest">
										{(selectedCourse?.length ?? 0) > 0 ? (
											selectedCourse?.map(
												(evaluation, index) => (
													<Col
														key={index}
														md={9}
														className="mb-4"
													>
														<h5 key={index}>
															<strong>
																{
																	evaluation.testName
																}
															</strong>{" "}
															{new Date(
																evaluation.testDate
															) >
															new Date(today) ? (
																<MdOutlineRemove
																	style={{
																		color: "grey",
																	}}
																/>
															) : evaluation.validation ===
															  "Yes" ? (
																<FaCheck
																	style={{
																		color: "green",
																	}}
																/>
															) : (
																<AiOutlineClose
																	style={{
																		color: "red",
																	}}
																/>
															)}
														</h5>
														<p>
															{
																evaluation.description
															}
														</p>
														<p>
															Date:{" "}
															{
																evaluation.testDate
															}
														</p>
														<p>
															Points obtenu:{" "}
															<strong>
																{
																	evaluation.score
																}
															</strong>
														</p>
													</Col>
												)
											)
										) : (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												PAS DE TEST DANS CE COURS !
											</div>
										)}
									</div>
								</div>
							) : (
								<div style={{ paddingBottom: "18%" }}>
									<div className="calendar-header">
										<FaCalendarAlt />
										<div>
											<h5>
												<strong>
													Calendrier pour les tests{" "}
												</strong>
											</h5>
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
											eventPropGetter={eventStyleGetter}
											views={[Views.MONTH]}
											defaultView={Views.MONTH}
											messages={messages}
										/>
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

export default Student;
