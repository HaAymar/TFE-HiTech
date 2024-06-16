import "./style.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BE_URL } from "../../../config";
import { fetchAllTestStudent } from "../../Stores/allTestStudentState";

export interface TestDTO {
	testId: number;
	testName: string;
	validation: "Yes" | "No";
	points: number;
}

export interface CourseTestsDTO {
	courseName: string;
	tests: TestDTO[];
}

export interface StudentTestsDTO {
	studentName: string;
	studentSurname: string;
	courses: CourseTestsDTO[];
}

const StudentValidation: React.FC = () => {
	const studentsTest = useRecoilValue(fetchAllTestStudent);
	const [students, setStudents] = useState<StudentTestsDTO[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<string>("");
	const [isEditingEnabled, setIsEditingEnabled] = useState<boolean>(false);

	useEffect(() => {
		setStudents(studentsTest);
	}, [studentsTest]);

	// ...

	const handleEditValidation = async (
		studentIndex: number,
		courseIndex: number,
		testIndex: number,
		newValidation: "Yes" | "No",
		newPoints: number
	) => {
		if (!isEditingEnabled) return;

		const updatedStudents = students.map((student) => ({
			...student,
			courses: student.courses.map((course) => ({
				...course,
				tests: course.tests.map((test) => ({ ...test })),
			})),
		}));

		updatedStudents[studentIndex].courses[courseIndex].tests[
			testIndex
		].validation = newValidation;
		updatedStudents[studentIndex].courses[courseIndex].tests[
			testIndex
		].points = newPoints;
		const validate = {
			score: newPoints,
			validation: newValidation,
		};

		setStudents(updatedStudents);

		const testId =
			updatedStudents[studentIndex].courses[courseIndex].tests[testIndex]
				.testId;

		try {
			await axios.patch(`${BE_URL}tests/${testId}`, validate, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(
				`Validation and points updated successfully for test id ${testId}`
			);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error(
					"Error while updating validation and points:",
					error
				);
				if (error.response) {
					console.error(
						"Server responded with status:",
						error.response.status
					);
					console.error("Response data:", error.response.data);
				} else if (error.request) {
					console.error(
						"Request made but no response received:",
						error.request
					);
				} else {
					console.error("Error setting up request:", error.message);
				}
				console.error("Error config:", error.config);
			} else {
				console.error("Unknown error occurred:", error);
			}
		}
	};

	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement>,
		studentIndex: number
	) => {
		event.preventDefault();
		window.location.reload();

		console.log(students[studentIndex]);
	};

	return (
		<Container className="container-custom">
			<Row className="justify-content-md-center">
				<Col md="10">
					<h2 className="title">Validation des étudiants</h2>
					<div className="form-group-custom">
						<label htmlFor="course-select">
							Trier par formation :
						</label>
						<select
							id="course-select"
							value={selectedCourse}
							onChange={(e) => setSelectedCourse(e.target.value)}
							className="custom-select"
						>
							<option value="">Toutes les formations</option>
							<option value="ICM_DCW">Initiation en IT</option>
							<option value="I&D">Helpdesk IT</option>
							<option value="IDC&Scripting">
								Tech PC & Réseaux
							</option>
							<option value="Base Linux">Dev Web</option>
						</select>
					</div>
					<Form.Check
						type="checkbox"
						label="Activer la modification"
						checked={isEditingEnabled}
						onChange={() => setIsEditingEnabled(!isEditingEnabled)}
					/>
					<div className="contentCard">
						{students.map((student, studentIndex) => (
							<div className="cardValidation" key={studentIndex}>
								<Form
									onSubmit={(e) =>
										handleSubmit(e, studentIndex)
									}
									className="formStyle"
								>
									<h4>
										<strong>
											Nom et prénom :{" "}
											{student.studentName}{" "}
											{student.studentSurname}
										</strong>
									</h4>
									{student.courses.map(
										(course, courseIndex) => (
											<div
												className="courseRow"
												key={courseIndex}
											>
												<span className="courseTitle">
													{course.courseName}
												</span>
												<div className="testCheckboxes">
													{course.tests.map(
														(test, testIndex) => (
															<div
																key={testIndex}
																className="d-flex align-items-center"
															>
																<Form.Check
																	inline
																	type="checkbox"
																	label={
																		test.testName
																	}
																	checked={
																		test.validation ===
																		"Yes"
																	}
																	onChange={() =>
																		handleEditValidation(
																			studentIndex,
																			courseIndex,
																			testIndex,
																			test.validation ===
																				"Yes"
																				? "No"
																				: "Yes",
																			test.points
																		)
																	}
																	disabled={
																		!isEditingEnabled
																	}
																	className={
																		test.validation ===
																		"Yes"
																			? "success-checkbox"
																			: "danger-checkbox"
																	}
																/>
																<Form.Control
																	type="number"
																	value={
																		test.points
																	}
																	onChange={(
																		e
																	) => {
																		const newPoints =
																			parseInt(
																				e
																					.target
																					.value
																			);
																		handleEditValidation(
																			studentIndex,
																			courseIndex,
																			testIndex,
																			test.validation,
																			newPoints
																		);
																	}}
																	disabled={
																		!isEditingEnabled
																	}
																	className="ml-2"
																	style={{
																		width: "60px",
																	}}
																/>
															</div>
														)
													)}
												</div>
											</div>
										)
									)}
									<Button
										type="submit"
										className="btn-submit mt-3"
									>
										Valider les tests
									</Button>
								</Form>
							</div>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default StudentValidation;
