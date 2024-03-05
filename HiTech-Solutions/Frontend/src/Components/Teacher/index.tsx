import './style.css';

import React, { useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';

interface ITest {
	id: number;
	titre: string;
	description: string;
	date: string;
	points: number;
}

const FormulaireTest: React.FC = () => {
	const [tests, setTests] = useState<ITest[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [titre, setTitre] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [points, setPoints] = useState<number | "">("");

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const ajouterTest = () => {
		const nouveauTest: ITest = {
			id: Date.now(),
			titre,
			description,
			date,
			points: Number(points),
		};
		setTests([...tests, nouveauTest]);
		handleClose();
		setTitre("");
		setDescription("");
		setDate("");
		setPoints("");
	};

	const supprimerTest = (id: number) => {
		setTests(tests.filter((test) => test.id !== id));
	};

	return (
		<Container
			className="contentTest"
			style={{ width: "850px", backgroundColor: "#dadde0" }}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "50%",
				}}
			>
				<h5>Creation d'une nouveau test</h5>
				<Button
					onClick={handleShow}
					style={{ width: "150px", backgroundColor: "#314353" }}
				>
					Ajouter un Test
				</Button>
			</div>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Ajouter un Nouveau Test</Modal.Title>
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
					<Button
						variant="danger"
						onClick={handleClose}
						style={{ backgroundColor: "#d84b4b" }}
					>
						Annuler
					</Button>
					<Button
						onClick={ajouterTest}
						style={{ backgroundColor: "#43928d" }}
					>
						Ajouter
					</Button>
				</Modal.Footer>
			</Modal>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<p className="text-container">
					La liste des tests à faire durant la formation pour les
					étudiants inscrit dans ce cours.
				</p>
			</div>

			<Table striped bordered hover className="mt-4">
				<thead>
					<tr>
						<th>N°</th>
						<th>Titre</th>
						<th>Description</th>
						<th style={{ width: "100px" }}>Date</th>
						<th> Cotations</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tests.map((test, index) => (
						<tr key={test.id}>
							<td>{index + 1}</td>
							<td>{test.titre}</td>
							<td>{test.description}</td>
							<td>{test.date}</td>
							<td>{test.points}</td>
							<td>
								<Button
									onClick={() => supprimerTest(test.id)}
									style={{ backgroundColor: "#d84b4b" }}
								>
									Supprimer
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default FormulaireTest;
