import "./style.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Form,
	Modal,
	OverlayTrigger,
	Table,
	Tooltip,
} from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";

import { BE_URL } from "../../../config";
import { findByFormationName } from "../../Stores/formationCourses";
import { fetchFormations } from "../../Stores/formationsState";

//------------ Interface Formation --------------//
interface Formation {
	id: number;
	name: string;
	description: string;
	photo: File | string | null;
}

//------------ Create Course --------------//
interface CreateCourse {
	name: string;
}

//------------ Int Course --------------//
interface Course {
	id: number;
	name: string;
}

//------------ Int Select Courses By Formation ------//

interface CoursesByFormation {
	[key: string]: Course[];
}

const CreationFormations: React.FC = () => {
	const [editingFormationId, setEditingFormationId] = useState<number | null>(
		null
	);
	const [, setIsLoading] = useState(false);
	const [editedName, setEditedName] = useState<string>("");
	const [editedDescription, setEditedDescription] = useState<string>("");

	const [, setEditingCourseId] = useState<number | null>(null);
	const [, setEditedCourseName] = useState<string>("");

	const currentFormations = useRecoilValue(fetchFormations);
	const [formations, setFormations] =
		useState<Formation[]>(currentFormations);

	const [showModalForm, setShowModalForm] = useState<boolean>(false);
	const [showModalCours, setShowModalCours] = useState<boolean>(false);

	const [selectedFormation, setSelectedFormation] =
		useState<Formation | null>(null);

	const [titre, setTitre] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [photo, setPhoto] = useState<File | null | string>(null);

	const [nameCourse, setNameCourse] = useState<string>("");

	const [refreshCourses] = useState<boolean>(false);
	const [selectedFormationId, setSelectedFormationId] = useState<string>("");

	const handleEditClick = (
		item: Formation | { courseId: number; courseName: string },
		isCourse: boolean = false
	) => {
		if (isCourse) {
			const { courseId, courseName } = item as {
				courseId: number;
				courseName: string;
			};
			setEditingCourseId(courseId);
			setEditedCourseName(courseName);

			setEditingFormationId(null);
		} else {
			const formation = item as Formation;
			setEditingFormationId(formation.id);
			setEditedName(formation.name);
			setEditedDescription(formation.description);

			setEditingCourseId(null);
		}
	};

	const [coursesByFormation, setCoursesByFormation] =
		useState<CoursesByFormation>({});

	useEffect(() => {
		currentFormations.forEach((formation) => {
			findByFormationName(formation.name).then((courses) => {
				setCoursesByFormation((prev) => ({
					...prev,
					[formation.name]: courses,
				}));
			});
		});
	}, [currentFormations, refreshCourses]);

	//--------------- Creating new course ----------------//

	const handleSelectChange = (event: any) => {
		setSelectedFormationId(event.target.value);
	};

	const handleCreateCourse = async () => {
		if (!selectedFormationId) {
			alert("Veuillez sélectionner une formation.");
			return;
		}

		const selectedFormationName = currentFormations.find(
			(formation) => formation.id === parseInt(selectedFormationId)
		)?.name;

		const newCourse: CreateCourse = {
			name: nameCourse,
		};

		try {
			const response = await axios.post(
				`${BE_URL}courses/${selectedFormationId}`,
				newCourse,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log(
				"New course has been added successfully:",
				response.data
			);

			if (selectedFormationName) {
				setCoursesByFormation((prev) => ({
					...prev,
					[selectedFormationName]: [
						...(prev[selectedFormationName] || []),
						response.data,
					],
				}));
			}
		} catch (error) {
			console.error("Error while adding a new course:", error);
		} finally {
			setIsLoading(false);
			handleCloseModal();
		}

		setNameCourse("");
		setSelectedFormationId("");
	};

	// ------------- End creating course ---------------- //

	//------- handleSave -----------------//
	const handleSave = async (id: number) => {
		const updatedFormation = {
			name: editedName,
			description: editedDescription,
		};

		try {
			const response = await axios.put(
				`${BE_URL}formations/${id}`,
				updatedFormation,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(
				`Formation with id ${id} was updated successfully.`,
				response.data
			);

			setFormations((prev) =>
				prev.map((formation) =>
					formation.id === id
						? { ...formation, ...updatedFormation }
						: formation
				)
			);
		} catch (error) {
			console.error("Error while modifying the training", error);
		}

		setEditingFormationId(null);
	};

	//-- save --//

	//----------- Create Formations--------------//

	const handleCreateFormation = async () => {
		if (!photo) {
			alert("Please select a file.");
			return;
		}
		const formData = new FormData();
		formData.append("name", titre);
		formData.append("description", description);

		if (photo) {
			formData.append("photo", photo);
		}

		console.log("photo", photo);
		handleCloseModal();

		try {
			const response = await axios.post(
				`${BE_URL}/formations`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 201) {
				setFormations((prev) => [...prev, response.data]);
			}
		} catch (error) {
			console.error("Error adding training", error);
		} finally {
			setIsLoading(false);
			handleCloseModal();
		}
	};

	//---------- End create formation --------------- //

	const handleDeleteFormation = async (id: number) => {
		console.log(id);
		try {
			await axios.delete(`${BE_URL}courses/formation/${id}`, {
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

	const handleDeleteCourse = async (id: number) => {
		console.log(id);
		try {
			await axios.delete(`${BE_URL}courses/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(`Course with id ${id} was deleted successfully.`);

			setCoursesByFormation((prevCourses) => {
				const updatedCourses = { ...prevCourses };
				Object.keys(updatedCourses).forEach((key) => {
					updatedCourses[key] = updatedCourses[key].filter(
						(course) => course.id !== id
					);
				});
				return updatedCourses;
			});
			handleCloseModal();
		} catch (error) {
			console.error("Error while deleting coourse", error);
		}
	};

	const handleCloseModal = () => {
		setSelectedFormation(null);
		setTitre("");
		setDescription("");
		setShowModalForm(false);
		setShowModalCours(false);
	};

	const handleEditFormation = async () => {
		if (selectedFormation) {
			const updatedFormation = {
				name: titre,
				description: description,
				photo: photo,
			};

			try {
				console.log("Selection de la formation", selectedFormation);
				await axios.put(
					`${BE_URL}formations/${selectedFormation.id}`,
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
	// ------ End Side Formation ---------- //

	return (
		<Container
			className="containerTable"
			style={{
				width: "80%",
				backgroundColor: "#dadde0",
				marginLeft: "10px",
			}}
		>
			<div className="headerDashboard">
				<div>
					<h4>
						<b>Gestion des formations</b>
					</h4>
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
				<p className="descripText">
					Pour pouvoir ajouter une nouvelle formation ou un cours,
					cliquez sur les boutons qui se trouvent sur votre droite
					selon votre choix.{" "}
				</p>

				<div className="addButton">
					<Button
						onClick={() => setShowModalForm(true)}
						style={{ backgroundColor: "#314353", border: "none" }}
					>
						<IoIosAdd />
						Ajouter une formation
					</Button>
					<Button
						onClick={() => setShowModalCours(true)}
						style={{ backgroundColor: "#314353", border: "none" }}
					>
						<IoIosAdd />
						Ajouter un cours
					</Button>
				</div>
			</div>
			<div className="content">
				<div className="tableScroll">
					<Table striped bordered hover>
						<thead className="sticky-header">
							<tr>
								<th
									style={{
										textAlign: "center",
										width: "100px",
									}}
								>
									N°
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Titre
								</th>
								<th
									style={{
										textAlign: "center",
										minWidth: "200px",
										maxWidth: "300px",
									}}
								>
									Description
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Cours
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{formations.map((formation, index) => (
								<tr key={formation.id}>
									<td style={{ textAlign: "center" }}>
										{index + 1}
									</td>
									<td style={{ textAlign: "center" }}>
										{editingFormationId === formation.id ? (
											<input
												className="descripEdit"
												type="text"
												value={editedName}
												onChange={(e) =>
													setEditedName(
														e.target.value
													)
												}
											/>
										) : (
											formation.name
										)}
									</td>
									<td
										style={{
											textAlign: "center",
										}}
									>
										{editingFormationId === formation.id ? (
											<textarea
												className="descripEdit"
												rows={6}
												cols={50}
												value={editedDescription}
												onChange={(e) =>
													setEditedDescription(
														e.target.value
													)
												}
											/>
										) : (
											formation.description
										)}
									</td>
									<td style={{ textAlign: "center" }}>
										<ol
											style={{
												maxHeight: "100px",
												overflowY: "auto",
											}}
										>
											{coursesByFormation[
												formation.name
											]?.map((course, index) => (
												<li
													key={index}
													style={{
														display: "flex",
														justifyContent:
															"space-between",
														alignItems: "center",
													}}
												>
													{course.name}
													<button
														style={{
															border: "none",
															background: "none",
															cursor: "pointer",
															color: "gray",
														}}
														onClick={() =>
															handleDeleteCourse(
																course.id
															)
														}
													>
														&#x2715;{" "}
													</button>
												</li>
											))}
										</ol>
									</td>
									<td>
										<div className="buttons">
											{editingFormationId ===
											formation.id ? (
												<OverlayTrigger
													placement="top"
													overlay={
														<Tooltip
															id={`tooltip-save`}
														>
															Enregistrer
														</Tooltip>
													}
												>
													<Button
														style={{
															display: "flex",
															justifyContent:
																"center",
															alignItems:
																"center",
															color: "white",
															backgroundColor:
																"#40b9af",
															border: "none",
														}}
														onClick={() =>
															handleSave(
																formation.id
															)
														}
													>
														<IoSaveOutline />
													</Button>
												</OverlayTrigger>
											) : (
												<OverlayTrigger
													placement="top"
													overlay={
														<Tooltip
															id={`tooltip-save`}
														>
															Modifier
														</Tooltip>
													}
												>
													<Button
														style={{
															display: "flex",
															justifyContent:
																"center",
															alignItems:
																"center",
															color: "white",
															backgroundColor:
																"#40b9af",
															border: "none",
														}}
														onClick={() =>
															handleEditClick(
																formation
															)
														}
													>
														<FaRegEdit />
													</Button>
												</OverlayTrigger>
											)}
											<OverlayTrigger
												placement="top"
												overlay={
													<Tooltip
														id={`tooltip-save`}
													>
														Supprimer
													</Tooltip>
												}
											>
												<Button
													style={{
														display: "flex",
														justifyContent:
															"center",
														alignItems: "center",
													}}
													variant="danger"
													onClick={() =>
														handleDeleteFormation(
															formation.id
														)
													}
												>
													<RiDeleteBin6Line />
												</Button>
											</OverlayTrigger>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<Modal show={showModalForm} onHide={handleCloseModal}>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#2ea1befa" }}
				>
					<Modal.Title style={{ textAlign: "center" }}>
						<h4>Ajouter une nouvelle formation</h4>
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
									type="file"
									onChange={(e) => {
										if (
											e.target.files &&
											e.target.files.length > 0
										) {
											setPhoto(e.target.files[0]);
										}
									}}
								/>

								<div>
									<p>
										URL de l'image:{" "}
										{photo
											? photo.toString()
											: "Pas d'image"}
									</p>
								</div>
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
			<Modal show={showModalCours} onHide={handleCloseModal}>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#2ea1befa" }}
				>
					<Modal.Title style={{ textAlign: "center" }}>
						Ajouter un nouveau cours
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formFormation">
							<Form.Label>Choix de la formation</Form.Label>

							<Form.Select
								value={selectedFormationId}
								onChange={handleSelectChange}
							>
								<option value="">
									Sélectionner une formation
								</option>
								{formations.map(
									(formation: Formation, index) => (
										<option
											key={formation.id}
											value={formation.id}
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
								value={nameCourse}
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
			</Modal>
		</Container>
	);
};

export default CreationFormations;
