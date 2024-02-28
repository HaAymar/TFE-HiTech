import "./style.css";

import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";

import { fetchFormations } from "../../Stores/formationsState";

interface Formation {
	id: number;
	name: string;
	description: string;
	photo: File | null;
}

interface CreateFormation {
	name: string;
	description: string;
	photo: string;
}

const CreationFormations: React.FC = () => {
	const currentFormations = useRecoilValue(fetchFormations);

	const [formations, setFormations] =
		useState<Formation[]>(currentFormations);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedFormation, setSelectedFormation] =
		useState<Formation | null>(null);
	const [titre, setTitre] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [photo, setphoto] = useState<File | null>(null);

	const handleCreateFormation = async () => {
		const newFormation: CreateFormation = {
			name: titre,
			description: description,
			photo: "my photo",
		};

		console.log(newFormation);
		handleCloseModal();

		try {
			const response = await axios.post(
				"http://localhost:3001/formations",
				newFormation,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("The data was inserted correctly", response.data);
		} catch (error) {
			console.error("Error adding training", error);
		}
	};

	const handleDeleteFormation = async (id: number) => {
		console.log(id);
		try {
			await axios.delete(`http://localhost:3001/formations/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const updatedFormations = formations.filter(
				(formation) => formation.id !== id
			);
			setFormations(updatedFormations);

			console.log(`Formation with id ${id} was deleted successfully.`);

			handleCloseModal();
		} catch (error) {
			console.error(
				"Erreur lors de la suppression de la formation",
				error
			);
		}
	};

	const handleShowModal = (formation: Formation) => {
		setSelectedFormation(formation);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedFormation(null);
		setTitre("");
		setDescription("");
		setShowModal(false);
	};

	const handleEditFormation = async () => {
		if (selectedFormation) {
			const updatedFormation = {
				name: titre,
				description: description,
				photo: photo,
			};

			try {
				await axios.put(
					`http://localhost:3001/formations/${selectedFormation.id}`,
					updatedFormation,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const updatedFormations = formations.map((formation) =>
					formation.id === selectedFormation.id
						? { ...formation, ...updatedFormation }
						: formation
				);
				setFormations(updatedFormations);

				handleCloseModal();
				console.log(
					`Formation with id ${selectedFormation.id}identity was updated successfully.`
				);
			} catch (error) {
				console.error("Error while modifying the training", error);
			}
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
								border: "none",
								borderRadius: "5px",
								padding: "4px",
								borderColor: "#ccc",
							}}
						>
							<option value="">Choisir une option</option>
							<option value="option1">A</option>
							<option value="option2">a</option>
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
				<div className="tableScroll">
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
							{formations.map((formation: Formation) => (
								<tr key={formation.id}>
									<td style={{ textAlign: "center" }}>
										{formation.name}
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
								<input
									id="file-upload"
									// type="file"
									// onChange={(e) => {
									// 	if (
									// 		e.target.files &&
									// 		e.target.files[0]
									// 	) {
									// 		setphoto(e.target.files[0]);
									// 	}
									// }}
								/>
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
							onClick={handleCreateFormation}
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
