import "./style.css";

import React, { useState } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	Modal,
	Row,
	Table,
} from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";

interface Formation {
	id: number;
	titre: string;
	description: string;
	photo: File | null;
}

const CreationFormations: React.FC = () => {
	let currentFormations: Formation[] = [
		{
			id: 1,
			titre: "Admin réseau",
			description: "- Linux \n- Configuration des services \n",
			photo: null,
		},
		{
			id: 2,
			titre: "Virtualisation",
			description: "- Hypervisor ESXi \n- VMWARE\n- OSytem",
			photo: null,
		},
		{
			id: 3,
			titre: "Dev Web",
			description:
				"- Backend (Php, Node.js)\n- Frontend (React Js, Angular Js ..)",
			photo: null,
		},
	];
	const [formations, setFormations] =
		useState<Formation[]>(currentFormations);
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
		<Container
			className="containerTable"
			style={{ width: "800px", backgroundColor: "#dadde0" }}
		>
			<div className="headerDashboard">
				<div>
					<h4>Gestion des formations</h4>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<h6>Filtrer par : </h6>{" "}
						<select
							style={{
								border: "none", // Enlève la bordure par défaut
								borderRadius: "5px", // Ajoute un rayon de 10px
								padding: "4px", // Agrandit la bordure à 2px
								borderColor: "#ccc", // Couleur de la bordure
							}}
						>
							<option value="">Choisir une option</option>
							<option value="option1">A</option>
							<option value="option2">a</option>
							{/* Ajoutez autant d'options que nécessaire */}
						</select>
					</div>
				</div>

				<div className="">
					<Button
						onClick={() => setShowModal(true)}
						style={{ backgroundColor: "#314353" }}
					>
						<IoIosAdd />
						Ajouter une formation
					</Button>
				</div>
			</div>
			<div className="content">
				<div style={{ overflowY: "auto", maxHeight: "500px" }}>
					<Table striped bordered hover>
						<thead className="sticky-header">
							<tr>
								<th style={{ textAlign: "center" }}>Titre</th>
								<th style={{ textAlign: "center" }}>
									Description
								</th>
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
												style={{
													color: "white",
													backgroundColor: "#40b9af",
													border: "none",
												}}
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
							<div className="upload-btn">
								<label
									htmlFor="file-upload"
									className="custom-file-upload"
								>
									<div className="icon">
										<RiImageAddFill />
										Upload Photo
									</div>
								</label>
								<input id="file-upload" type="file" />
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={handleCloseModal}
						style={{
							border: "none",
						}}
					>
						Annuler
					</Button>
					{selectedFormation ? (
						<Button
							variant="primary"
							onClick={handleEditFormation}
							style={{
								backgroundColor: "#5c9b9e",
								border: "none",
							}}
						>
							Enregistrer les modifications
						</Button>
					) : (
						<Button
							variant="primary"
							onClick={handleAddFormation}
							style={{
								backgroundColor: "#5c9b9e",
								border: "none",
							}}
						>
							Ajouter
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default CreationFormations;
