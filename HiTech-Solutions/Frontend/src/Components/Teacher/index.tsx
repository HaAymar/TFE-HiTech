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
		<Container className="contentTest">
			<Button variant="primary" onClick={handleShow}>
				Ajouter un Test
			</Button>

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
							<Form.Label>Points</Form.Label>
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
					<Button variant="secondary" onClick={handleClose}>
						Fermer
					</Button>
					<Button variant="primary" onClick={ajouterTest}>
						Ajouter
					</Button>
				</Modal.Footer>
			</Modal>

			<Table striped bordered hover className="mt-4">
				<thead>
					<tr>
						<th>#</th>
						<th>Titre</th>
						<th>Description</th>
						<th>Date</th>
						<th>Points</th>
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
									variant="danger"
									onClick={() => supprimerTest(test.id)}
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
