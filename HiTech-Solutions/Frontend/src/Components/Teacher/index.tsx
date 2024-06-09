import "./style.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Modal,
	Row,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BE_URL } from "../../config";
import { collectTestState } from "../Stores/collecTestId";
import { teacherCoursesState } from "../Stores/coursesState";
import { fetchCreationTests } from "../Stores/testExtentState";
import { userIdState } from "../Stores/userIdState";

interface Course {
	id: number;
	name: string;
}

interface Teacher {
	id: number;
}

interface ITest {
	id: number;
	name: string;
	dateTest: string;
	description: string;
	cotation: number;
	validation: "Yes" | "No";
	course: Course;
	teacher: Teacher;
}

const FormulaireTest: React.FC = () => {
	const idFormation = useRecoilValue(collectTestState);
	const [editingTestId, setEditingTestId] = useState<null | number>(null);
	const teacherId = useRecoilValue(userIdState);
	const currentTest = useRecoilValue(fetchCreationTests);
	console.log("currentTest", currentTest);
	const [editedDescription, setEditedDescription] = useState<string>("");
	const [editedName, setEditedName] = useState<string>("");
	const [editedDate, setEditedDate] = useState<string>("");
	const [editedCotation, setEditedCotation] = useState<number | "">("");

	const [tests, setTests] = useState<ITest[]>(currentTest);
	console.log("tests", tests);
	const [showTestModal, setShowTestModal] = useState<boolean>(false);
	const [showListModal, setShowListModal] = useState<boolean>(false);
	const [currentCourseId, setCurrentCourseId] = useState<number | null>(null);
	const [currentTestId, setCurrentTestId] = useState<number | null>(null);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [dateTest, setDateTest] = useState<string>("");
	const [cotation, setCotation] = useState<number | "">("");

	const handleCloseTestModal = () => {
		setShowTestModal(false);
		setCurrentTestId(null);
		resetForm();
	};

	const activerEdition = (test: ITest) => {
		setEditingTestId(test.id);
		setEditedName(test.name ?? "");
		setEditedDescription(test.description ?? "");
		setEditedDate(test.dateTest);
		setEditedCotation(test.cotation ?? "");
	};

	const handleSaveTest = async (testId: number) => {
		const updatedTest = {
			name: editedName,
			description: editedDescription,
			date: editedDate,
			cotation:
				editedCotation === ""
					? 0
					: typeof editedCotation === "string"
					? parseFloat(editedCotation)
					: editedCotation,
		};

		try {
			const response = await axios.put(
				`${BE_URL}creationTest/modify/${testId}`,
				updatedTest,
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			setTests((prev) =>
				prev.map((test) =>
					test.id === testId ? { ...test, ...response.data } : test
				)
			);
			console.log(
				`Test with id ${testId} was updated successfully.`,
				response.data
			);
		} catch (error) {
			console.error("Failed to update test:", error);
		} finally {
			setEditingTestId(null);
		}
	};

	const handleShowTestModal = (courseId: number, testId?: number) => {
		setCurrentCourseId(courseId);
		if (testId !== undefined) {
			const testToEdit = tests.find((test) => test.id === testId);
			if (testToEdit) {
				setName(testToEdit.name);
				setDescription(testToEdit.description || "");
				setDateTest(testToEdit.dateTest);
				setCotation(testToEdit.cotation || "");
				setCurrentTestId(testId);
			}
		}
		setShowTestModal(true);
	};

	const createTest = async () => {
		if (currentCourseId === null) return;

		const testDetails = {
			name: name,
			dateTest: dateTest,
			description,
			cotation: Number(cotation),
			id_course: currentCourseId,
			id_teacher: teacherId,
		};

		try {
			const response = await axios.post(
				`${BE_URL}creationTest`,
				testDetails,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log("Test created:", response.data);
			setTests((prevTests) => [...prevTests, response.data]);
			handleCloseTestModal();
		} catch (error) {
			console.error("Error adding test", error);
		}
	};

	const handleShowListModal = (courseId: number) => {
		setCurrentCourseId(courseId);
		setShowListModal(true);
	};

	const handleCloseListModal = () => setShowListModal(false);

	const handleDeleteTest = async (id: number) => {
		try {
			await axios.delete(`${BE_URL}creationTest/delete/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			setTests(tests.filter((test) => test.id !== id));

			console.log(`Test with id ${id} was deleted successfully.`);

			handleCloseTestModal();
		} catch (error) {
			console.error(
				"Erreur lors de la suppression de la formation",
				error
			);
		}
	};

	const resetForm = () => {
		setName("");
		setDescription("");
		setDateTest("");
		setCotation("");
		setCurrentTestId(null);
	};

	const findTestByCours = (courseId: number) => {
		const cx = tests.filter((test) => test.course.id === courseId);
		console.log("cc", courseId);
		return cx;
	};

	const coursesT = useRecoilValue(teacherCoursesState);
	console.log("courses", coursesT);

	console.log("teacherId", teacherId);
	const selectedFormationCourses = coursesT.filter(
		(course: any) => course.formationId === idFormation
	);
	let nameFormation;
	if (selectedFormationCourses && selectedFormationCourses.length > 0) {
		nameFormation = selectedFormationCourses[0].formationName;
	} else {
		console.log("No data available for formations.");
	}
	useEffect(() => {
		console.log("Tests have been updated", tests);
	}, [tests]);

	return (
		<Container
			className="contentTest"
			style={{ width: "80%", backgroundColor: "#dadde0" }}
		>
			<div className="titleHeader">
				<h3 style={{ fontWeight: "2.3rem" }}>
					Liste des cours {nameFormation}
				</h3>
				<p className="textContainer">
					Afin de pouvoir créer un test de ce cours, vous pouvez
					cliquer sur le bouton « Créer un Test » après la création
					cliquer sur « Liste des Tests où vous allez trouver tous les
					tests créer
				</p>
			</div>
			{selectedFormationCourses.length === 0 ? (
				<div
					className="text-center"
					style={{
						color: "grey",
					}}
				>
					<p>
						<strong>
							Vous ne possédez pas encore de cours dans cette
							formation
						</strong>{" "}
					</p>
				</div>
			) : (
				<Row className="justify-content-md-center">
					{selectedFormationCourses.map(
						(course: any, index: number) => (
							<Col key={index} xs={12} md={6} lg={4}>
								<Card
									style={{
										width: "20rem",
										margin: "1rem",
										borderRadius: "10px",
									}}
								>
									<Card.Body>
										<Card.Title
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{course.courseName}
										</Card.Title>
										<div
											className="d-flex justify-content-center"
											style={{ gap: "20px" }}
										>
											<Button
												onClick={() =>
													handleShowTestModal(
														course.courseId
													)
												}
												style={{
													backgroundColor: "#314353",
													border: "none",
												}}
											>
												Créer un Test
											</Button>
											<Button
												variant="secondary"
												onClick={() =>
													handleShowListModal(
														course.courseId
													)
												}
											>
												Tests existant
											</Button>
										</div>
									</Card.Body>
								</Card>
							</Col>
						)
					)}
				</Row>
			)}

			<Modal
				show={showListModal}
				onHide={handleCloseListModal}
				dialogClassName="custom-modal-md"
			>
				<Modal.Header closeButton>
					<Modal.Title>Liste des Tests</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ overflowY: "auto", maxHeight: "70vh" }}>
					{currentCourseId &&
					findTestByCours(currentCourseId).length > 0 ? (
						findTestByCours(currentCourseId).map((test, index) => (
							<div
								key={test.id}
								className="test-list-item mb-3"
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "10px",
								}}
							>
								<strong>
									{index + 1}. {test.name}
								</strong>
								{editingTestId === test.id ? (
									<>
										<input
											className="editText"
											defaultValue={test.name}
											onChange={(e) =>
												setEditedName(e.target.value)
											}
										/>
										<Form.Control
											style={{
												border: "none",
												backgroundColor: "#dcdde0",
											}}
											as="textarea"
											rows={3}
											defaultValue={test.description}
											onChange={(e) =>
												setEditedDescription(
													e.target.value
												)
											}
										/>
										<Form.Control
											type="date"
											defaultValue={test.dateTest}
											onChange={(e) =>
												setEditedDate(e.target.value)
											}
										/>
										<Form.Control
											type="number"
											defaultValue={test.cotation.toString()}
											onChange={(e) =>
												setEditedCotation(
													e.target.value === ""
														? ""
														: Number(e.target.value)
												)
											}
										/>
									</>
								) : (
									<>
										<div>
											<strong>Name:</strong> {test.name}
										</div>

										<div>
											<strong>Description:</strong>{" "}
											{test.description}
										</div>
										<div>
											<strong>Date:</strong>{" "}
											{test.dateTest}
										</div>
										<div>
											<strong>Cotation:</strong>{" "}
											{test.cotation}
										</div>
									</>
								)}
								<div style={{ display: "flex", gap: "10px" }}>
									{editingTestId === test.id ? (
										<Button
											style={{
												backgroundColor: "#40b9af",
												border: "none",
											}}
											size="sm"
											onClick={() =>
												handleSaveTest(test.id)
											}
										>
											Enregistrer
										</Button>
									) : (
										<>
											<Button
												style={{
													backgroundColor: "#40b9af",
													border: "none",
												}}
												size="sm"
												onClick={() =>
													activerEdition(test)
												}
											>
												Modifier
											</Button>
											<Button
												variant="danger"
												size="sm"
												onClick={() =>
													handleDeleteTest(test.id)
												}
											>
												Supprimer
											</Button>
										</>
									)}
								</div>
							</div>
						))
					) : (
						<p>Aucun test trouvé pour ce cours.</p>
					)}
				</Modal.Body>

				<Modal.Footer></Modal.Footer>
			</Modal>

			<Modal show={showTestModal} onHide={handleCloseTestModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						{currentTestId
							? "Modifier un Test"
							: "Ajouter un Nouveau Test"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={() => {
							if (editingTestId !== null) {
								handleSaveTest(editingTestId);
							} else {
								console.error("Test ID is null");
							}
						}}
					>
						<Form.Group className="mb-3">
							<Form.Label>Nom du test</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								value={dateTest}
								onChange={(e) => setDateTest(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Cotation de cotation</Form.Label>
							<Form.Control
								type="number"
								value={cotation}
								onChange={(e) =>
									setCotation(
										e.target.value === ""
											? ""
											: Number(e.target.value)
									)
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseTestModal}>
						Annuler
					</Button>
					<Button
						onClick={createTest}
						style={{
							backgroundColor: "#40b9af",
							border: "none",
						}}
					>
						{currentTestId ? "Modifier" : "Ajouter"}
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default FormulaireTest;
