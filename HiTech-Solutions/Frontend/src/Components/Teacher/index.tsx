import "./style.css";

import React, { useState } from "react";
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

import { collectTestState } from "../Stores/collecTestId";
import { teacherCoursesState } from "../Stores/coursesState";

// Interface pour définir la structure d'un test
interface ITest {
	id: number;
	titre: string;
	description: string;
	date: string;
	points: number;
	courseId: number;
}

// Composant principal
const FormulaireTest: React.FC = () => {
	// États
	const idFormation = useRecoilValue(collectTestState);
	const [editingTestId, setEditingTestId] = useState<null | number>(null);

	const [editedDescription, setEditedDescription] = useState("");
	const [editedTitre, setEditedTitre] = useState("");
	const [editedDate, setEditedDate] = useState("");
	const [editedPoints, setEditedPoints] = useState<number | "">("");

	const [tests, setTests] = useState<ITest[]>([]);
	const [showTestModal, setShowTestModal] = useState(false);
	const [showListModal, setShowListModal] = useState(false);
	const [currentCourseId, setCurrentCourseId] = useState<number | null>(null);
	const [currentTestId, setCurrentTestId] = useState<number | null>(null);

	// États pour le formulaire
	const [titre, setTitre] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [points, setPoints] = useState<number | "">("");

	// Fermer le modal de test
	const handleCloseTestModal = () => {
		setShowTestModal(false);
		setCurrentTestId(null); // Réinitialiser le test sélectionné pour modification
		resetForm();
	};

	const activerEdition = (test: ITest) => {
		setEditingTestId(test.id);
		setEditedDescription(test.description);
	};

	const sauvegarderModification = (testId: number) => {
		const updatedTests = tests.map((test) => {
			if (test.id === testId) {
				return {
					...test,
					titre: editedTitre,
					description: editedDescription,
					date: editedDate,
					// Assurez-vous que `points` est un nombre. Utilisez 0 ou une autre valeur par défaut si `editedPoints` est une chaîne vide.
					points: editedPoints === "" ? 0 : editedPoints,
				};
			}
			return test;
		});
		setTests(updatedTests);
		setEditingTestId(null); // Sortir du mode d'édition
		// Réinitialiser les états édités si nécessaire
	};

	// Afficher le modal de test pour ajout ou modification
	const handleShowTestModal = (courseId: number, testId?: number) => {
		setCurrentCourseId(courseId);
		if (testId !== undefined) {
			const testToEdit = tests.find((test) => test.id === testId);
			if (testToEdit) {
				setTitre(testToEdit.titre);
				setDescription(testToEdit.description);
				setDate(testToEdit.date);
				setPoints(testToEdit.points);
				setCurrentTestId(testId);
			}
		}
		setShowTestModal(true);
	};

	// Ajouter ou modifier un test
	const ajouterOuModifierTest = () => {
		if (currentCourseId === null) return;
		if (currentTestId === null) {
			// Ajout d'un nouveau test
			const nouveauTest: ITest = {
				id: Date.now(),
				titre,
				description,
				date,
				points: Number(points),
				courseId: currentCourseId,
			};
			setTests([...tests, nouveauTest]);
		} else {
			// Mise à jour d'un test existant
			setTests(
				tests.map((test) =>
					test.id === currentTestId
						? {
								...test,
								titre,
								description,
								date,
								points: Number(points),
						  }
						: test
				)
			);
		}
		handleCloseTestModal();
	};

	// Afficher le modal de liste des tests
	const handleShowListModal = (courseId: number) => {
		setCurrentCourseId(courseId);
		setShowListModal(true);
	};

	// Fermer le modal de liste des tests
	const handleCloseListModal = () => setShowListModal(false);

	// Supprimer un test
	const supprimerTest = (id: number) => {
		setTests(tests.filter((test) => test.id !== id));
	};

	// Réinitialiser le formulaire
	const resetForm = () => {
		setTitre("");
		setDescription("");
		setDate("");
		setPoints("");
		setCurrentTestId(null);
	};

	// Trouver les tests pour un cours donné
	const trouverTestsParCours = (courseId: number) => {
		return tests.filter((test) => test.courseId === courseId);
	};

	const coursesT = useRecoilValue(teacherCoursesState);
	console.log("courses", coursesT);

	const selectedFormationCourses = coursesT.filter(
		(course: any) => course.formationId === idFormation
	);
	let nameFormation;
	if (selectedFormationCourses && selectedFormationCourses.length > 0) {
		nameFormation = selectedFormationCourses[0].formationName;
	} else {
		console.log("No data available for formations.");
	}
	console.log("Hey hey", nameFormation);
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
					trouverTestsParCours(currentCourseId).length > 0 ? (
						trouverTestsParCours(currentCourseId).map(
							(test, index) => (
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
										{index + 1}. {test.titre}
									</strong>
									{editingTestId === test.id ? (
										<>
											<input
												className="editText"
												defaultValue={test.titre}
												onChange={(e) =>
													setEditedTitre(
														e.target.value
													)
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
												defaultValue={test.date}
												onChange={(e) =>
													setEditedDate(
														e.target.value
													)
												}
											/>
											<Form.Control
												type="number"
												defaultValue={test.points.toString()}
												onChange={(e) =>
													setEditedPoints(
														e.target.value === ""
															? ""
															: Number(
																	e.target
																		.value
															  )
													)
												}
											/>
										</>
									) : (
										<>
											<div>
												<strong>Titre:</strong>{" "}
												{test.titre}
											</div>

											<div>
												<strong>Description:</strong>{" "}
												{test.description}
											</div>
											<div>
												<strong>Date:</strong>{" "}
												{test.date}
											</div>
											<div>
												<strong>Points:</strong>{" "}
												{test.points}
											</div>
										</>
									)}
									<div
										style={{ display: "flex", gap: "10px" }}
									>
										{editingTestId === test.id ? (
											<Button
												variant="success"
												size="sm"
												onClick={() =>
													sauvegarderModification(
														test.id
													)
												}
											>
												Sauvegarder
											</Button>
										) : (
											<>
												<Button
													style={{
														backgroundColor:
															"#40b9af",
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
														supprimerTest(test.id)
													}
												>
													Supprimer
												</Button>
											</>
										)}
									</div>
								</div>
							)
						)
					) : (
						<p>Aucun test trouvé pour ce cours.</p>
					)}
				</Modal.Body>

				<Modal.Footer>
					{/* <Button variant="secondary" onClick={handleCloseListModal}>
						Fermer
					</Button> */}
				</Modal.Footer>
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
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Titre du test</Form.Label>
							<Form.Control
								type="text"
								value={titre}
								onChange={(e) => setTitre(e.target.value)}
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
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Points de cotation</Form.Label>
							<Form.Control
								type="number"
								value={points}
								onChange={(e) =>
									setPoints(
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
						onClick={ajouterOuModifierTest}
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
