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
	// Données simulées pour les cours
	const courses = [
		{ id: 1, title: "Dév Web" },
		{ id: 2, title: "DNS Configuration" },
		{ id: 3, title: "Virtualisation" },
		{ id: 4, title: "Networking" },
	];

	// États
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

	return (
		<Container
			className="contentTest"
			style={{ width: "1200px", backgroundColor: "#dadde0" }}
		>
			<div className="titleHeader">
				<h5 style={{ fontWeight: "700" }}>
					Liste des cours en administration réseau{" "}
				</h5>
				<p className="text-container">
					Le lorem ipsum est, en imprimerie, une suite de mots sans
					signification utilisée à titre provisoire pour calibrer une
					mise en page,
				</p>
			</div>
			<Row className="justify-content-md-center">
				{courses.map((course, index) => (
					<Col key={index} xs={12} md={6} lg={4}>
						<Card style={{ width: "18rem", margin: "1rem" }}>
							<Card.Body>
								<Card.Title
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{course.title}
								</Card.Title>
								<div
									className="d-flex justify-content-center"
									style={{ gap: "20px" }}
								>
									<Button
										onClick={() =>
											handleShowTestModal(course.id)
										}
										style={{ backgroundColor: "#314353" }}
									>
										Ajouter un Test
									</Button>
									<Button
										variant="secondary"
										onClick={() =>
											handleShowListModal(course.id)
										}
									>
										Liste des Tests
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			<Modal show={showListModal} onHide={handleCloseListModal} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Liste des Tests</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ overflowY: "auto", maxHeight: "70vh" }}>
					{currentCourseId &&
					trouverTestsParCours(currentCourseId).length > 0 ? (
						trouverTestsParCours(currentCourseId).map(
							(test, key) => (
								<div
									className="test-list-item mb-3"
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "10px",
									}}
								>
									<h5>
										<strong>
											{key + 1}. {test.titre}
										</strong>
									</h5>
									<p>
										<strong>Description:</strong>{" "}
										{test.description}
									</p>
									<p>
										<strong>Date:</strong> {test.date}
									</p>
									<p>
										<strong>Points:</strong> {test.points}
									</p>
									<div
										style={{ display: "flex", gap: "10px" }}
									>
										<Button
											style={{
												backgroundColor: "#40b9af",
												border: "none",
											}}
											variant="primary"
											size="sm"
											onClick={() =>
												handleShowTestModal(
													currentCourseId,
													test.id
												)
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
									</div>
								</div>
							)
						)
					) : (
						<p>Aucun test trouvé pour ce cours.</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseListModal}>
						Fermer
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal pour ajouter/modifier un test */}
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
					<Button onClick={ajouterOuModifierTest}>
						{currentTestId ? "Modifier" : "Ajouter"}
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default FormulaireTest;
