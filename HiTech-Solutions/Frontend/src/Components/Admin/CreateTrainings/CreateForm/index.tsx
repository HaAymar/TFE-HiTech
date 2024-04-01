import React from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";

const CreateCourseComp = () => {
	return (
		<>
			{/* <Modal show={showModalCours} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center" }}>
						{selectedFormation
							? "Modifier les cours"
							: "Ajouter un nouveau cours"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formFormation">
							<Form.Label>Choix de la formation</Form.Label>

							<Form.Select
								value={nameForm}
								onChange={handleCreateCourse}
							>
								<option value="">
									Sélectionner une formation
								</option>
								{formations.map(
									(formation: Formation, index) => (
										<option
											key={formation.id}
											value={formation.name}
										>
											{formation.name}
										</option>
									)
								)}
							</Form.Select>
						</Form.Group>
						<Form.Group controlId="formTitre">
							<Form.Label>Nom du cours</Form.Label>
							<Form.Control
								type="text"
								// value={titre}
								onChange={(e) => setNameCourse(e.target.value)}
							/>
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
							onClick={handleCreateCourse}
							style={{
								backgroundColor: "#5c9b9e",
								border: "none",
							}}
						>
							Ajouter
						</Button>
					)}
				</Modal.Footer>
			</Modal> */}
		</>
	);
};

export default CreateCourseComp;
