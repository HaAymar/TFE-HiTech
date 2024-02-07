import "./style.css";

import React, { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";

interface Formation {
	id: number;
	titre: string;
	description: string;
	photo: File | null;
}

const CreationFormations: React.FC = () => {
	const [formations, setFormations] = useState<Formation[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedFormation, setSelectedFormation] =
		useState<Formation | null>(null);
	const [titre, setTitre] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [photo, setPhoto] = useState<File | null>(null);

	const handleAddFormation = () => {
		const newFormation: Formation = {
			id: formations.length + 1,
			titre: titre,
			description: description,
			photo: photo,
		};
		setFormations([...formations, newFormation]);
		handleCloseModal();
	};

	const handleDeleteFormation = (id: number) => {
		const updatedFormations = formations.filter(
			(formation) => formation.id !== id
		);
		setFormations(updatedFormations);
	};

	const handleShowModal = (formation: Formation) => {
		setSelectedFormation(formation);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedFormation(null);
		setTitre("");
		setDescription("");
		setPhoto(null);
		setShowModal(false);
	};

	const handleEditFormation = () => {
		if (selectedFormation) {
			const updatedFormations = formations.map((formation) =>
				formation.id === selectedFormation.id
					? {
							...formation,
							titre: titre,
							description: description,
							photo: photo,
					  }
					: formation
			);
			setFormations(updatedFormations);
			handleCloseModal();
		}
	};

	return (
		<Container className="containerTable">
			<div className="header">
				<h1>Gestion des formations</h1>
				<p>
					<b>Connecté en tant qu'administrateur :</b> Aymar Davy
					Hakizimana
				</p>

				<Button
					variant="primary"
					onClick={() => setShowModal(true)}
					style={{ width: "200px" }}
				>
					Ajouter une formation
				</Button>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ textAlign: "center" }}>Titre</th>
							<th style={{ textAlign: "center" }}>Description</th>
							<th style={{ textAlign: "center" }}>Actions</th>
						</tr>
					</thead>

					<tbody>
						{formations.map((formation) => (
							<tr key={formation.id}>
								<td style={{ textAlign: "center" }}>
									{formation.titre}
								</td>
								<td style={{ textAlign: "center" }}>
									{formation.description}
								</td>
								<td>
									<div className="buttons">
										<Button
											variant="info"
											onClick={() =>
												handleShowModal(formation)
											}
										>
											Modifier
										</Button>

										<Button
											variant="danger"
											onClick={() =>
												handleDeleteFormation(
													formation.id
												)
											}
										>
											Supprimer
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center" }}>
						{selectedFormation
							? "Modifier la formation"
							: "Ajouter une nouvelle formation"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formTitre">
							<Form.Label>Titre de la formation</Form.Label>
							<Form.Control
								type="text"
								value={titre}
								onChange={(e) => setTitre(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formPhoto">
							<Form.Label>Photo</Form.Label>
							<Form.Control
								type="file"
								// onChange={(e) =>
								// 	setPhoto(
								// 		e.target.files
								// 			? e.target.files[0]
								// 			: null
								// 	)
								// }
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleCloseModal}>
						Annuler
					</Button>
					{selectedFormation ? (
						<Button variant="primary" onClick={handleEditFormation}>
							Enregistrer les modifications
						</Button>
					) : (
						<Button variant="primary" onClick={handleAddFormation}>
							Ajouter
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default CreationFormations;
