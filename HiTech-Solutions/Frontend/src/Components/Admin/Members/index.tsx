import "./style.css";

import axios from "axios";
import { isValidPhoneNumber } from "libphonenumber-js";
import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	FormCheck,
	FormGroup,
	Modal,
	OverlayTrigger,
	Row,
	Table,
	Tooltip,
} from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";

import { BE_URL } from "../../../config";
import { fetchCourses } from "../../Stores/fetchCourses";
import { fetchFormations } from "../../Stores/formationsState";
import { fetchUsers } from "../../Stores/usersState";

interface Formation {
	formationId: number;
	formationName: string;
}
interface Course {
	id: number;
	name: string;
}

interface CourseD {
	courseId: number;
	courseName: string;
}

interface UserDetail {
	formations?: Formation[];
	courses?: CourseD[];
}

interface User {
	id: number;
	name: string;
	surname: string;
	email: string;
	role: string;
	tel: string;
	details: UserDetail;
}

interface CreateUser {
	name: string;
	surname: string;
	email: string;
	password?: string;
	tel: string;
}

const MembersFilter: React.FC = () => {
	const [selectedUser, setSelectedUser] = useState<number | "">("");

	const [selectedFormation, setSelectedFormation] = useState<number | "">("");
	const [selectedCourses, setSelectedCourses] = useState<Array<number>>([]);

	const [editingUserId, setEditingUserId] = useState<number | null>(null);
	const [editedName, setEditedName] = useState<string>("");
	const [editedSurname, setEditedSurname] = useState<string>("");
	const [editedEmail, setEditedEmail] = useState<string>("");
	const [editedTel, setEditedTel] = useState<string>("");

	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");

	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [phoneError, setPhoneError] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [selectedRole, setSelectedRole] = useState<string>("");
	const allUsers = useRecoilValue<User[]>(fetchUsers);
	const courses = useRecoilValue<Course[]>(fetchCourses);
	const formations = useRecoilValue<any[]>(fetchFormations);
	const [role, setRole] = useState<string>("");

	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [showModalForm, setShowModalForm] = useState<boolean>(false);
	const [showModalRole, setShowModalRole] = useState<boolean>(false);

	console.log(courses);

	const roles: any[] = [
		{ id: 1, name: "Student" },
		{ id: 2, name: "Teacher" },
		{ id: 3, name: "Admin" },
	];

	const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		setEmail(email);
		if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Veuillez entrer une adresse email valide.");
		} else {
			setEmailError("");
		}
	};

	const validatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		const phoneNumber = e.target.value;
		setPhoneNumber(phoneNumber);

		try {
			if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
				setPhoneError("");
			} else {
				setPhoneError("Entrer un numéro valide");
			}
		} catch (error) {
			setPhoneError("Entrer un numéro de téléphone valide!");
		}
	};

	console.log("All user", allUsers);
	const usersNoRole = allUsers.filter((user) => user.role === "-");
	console.log(usersNoRole);
	const renderDetailsList = (
		items: { formationName?: string; courseName?: string }[]
	) => {
		return (
			<ul
				style={{
					maxHeight: "100px",
					overflowY: "auto",
				}}
			>
				{items.map((item, idx) => (
					<li key={idx}>{item.formationName || item.courseName}</li>
				))}
			</ul>
		);
	};

	const renderFormationsOrCourses = (user: User) => {
		switch (user.role) {
			case "Student":
				return user.details.formations
					? renderDetailsList(user.details.formations)
					: "-";
			case "Teacher":
				return user.details.courses
					? renderDetailsList(user.details.courses)
					: "-";
			default:
				return "-";
		}
	};

	const handleCloseModal = () => {
		// setSelectedFormation(null);
		setName("");
		setSurname("");
		setEmail(" ");
		setPhoneNumber(" ");
		setShowModalForm(false);
		setShowModalRole(false);
	};

	//---------------- Create User -------------- //
	const handleCreateUser = async () => {
		const today = new Date();
		const year = today.getFullYear();
		console.log(year);

		const newUser: CreateUser = {
			name: name,
			surname: surname,
			email: email,
			password: name + year,
			tel: phoneNumber,
		};

		if (!name.trim() || !surname.trim() || !email.trim()) {
			alert("Nom, prénom, et email sont requis.");
			return; // Stoppe l'exécution si une des conditions n'est pas remplie
		}
		console.log(newUser);
		handleCloseModal();
		try {
			const response = await axios.post(`${BE_URL}users`, newUser, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log("The data was inserted correctly", response.data);

			setFilteredUsers((prevUsers) => [...prevUsers, response.data]);
		} catch (error) {
			console.error("Error adding training", error);
		}
	};

	const startEditing = (user: User) => {
		setEditingUserId(user.id);
		setEditedName(user.name);
		setEditedSurname(user.surname);
		setEditedEmail(user.email);
		setEditedTel(user.tel);
	};

	const handleDeleteUser = async (userId: number) => {
		try {
			await axios.delete(`${BE_URL}users/${userId}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(`User with id ${userId} was deleted successfully.`);

			setFilteredUsers((prev) =>
				prev.filter((user) => user.id !== userId)
			);

			handleCloseModal();
		} catch (error) {
			console.error("Error while deleting user", error);
		}
	};

	const saveChanges = async (userId: number) => {
		try {
			const updatedUser = {
				name: editedName,
				surname: editedSurname,
				email: editedEmail,
				tel: editedTel,
			};
			await axios.put(`${BE_URL}users/${userId}`, updatedUser);
			setFilteredUsers((prev) =>
				prev.map((user) =>
					user.id === userId ? { ...user, ...updatedUser } : user
				)
			);
			setEditingUserId(null);
		} catch (error) {
			console.error("Error updating user", error);
		}
	};

	const handleCourseSelection = (courseId: number) => {
		setSelectedCourses((prevSelectedCourses) => {
			if (prevSelectedCourses.includes(courseId)) {
				return prevSelectedCourses.filter((id) => id !== courseId);
			} else {
				return [...prevSelectedCourses, courseId];
			}
		});
	};

	useEffect(() => {
		if (selectedRole === "") {
			setFilteredUsers(allUsers);
		} else {
			setFilteredUsers(
				allUsers.filter((user) => user.role === selectedRole)
			);
		}
	}, [allUsers, selectedRole]);
	return (
		<Container
			className="containerTable"
			style={{
				width: "80%",
				backgroundColor: "#dadde0",
				marginLeft: "10px",
			}}
		>
			<div className="headerMembers">
				<div>
					<h4>
						<b>Gestionnaire des Membres</b>
					</h4>
					<h6>Filtrer par : </h6>{" "}
					<select
						onChange={(e) => setSelectedRole(e.target.value)}
						style={{
							border: "none",
							borderRadius: "5px",
							padding: "4px",
							borderColor: "#ccc",
						}}
					>
						<option value="" selected>
							Tous les membres
						</option>
						<option value="Student">Etudiants</option>
						<option value="Teacher">Professeurs</option>
						<option value="Admin">Admin</option>
					</select>
				</div>
				<p className="descripText">
					Pour pouvoir ajouter une nouvelle formation ou un cours,
					cliquez sur les boutons qui se trouvent sur votre droite
					selon votre choix.{" "}
				</p>

				<div className="addButton">
					<Button
						style={{ backgroundColor: "#314353", border: "none" }}
						onClick={() => setShowModalRole(true)}
					>
						<IoIosAdd />
						Ajouter rôle
					</Button>
					<Button
						style={{ backgroundColor: "#314353", border: "none" }}
						onClick={() => setShowModalForm(true)}
					>
						<IoIosAdd />
						Ajouter un membre
					</Button>
				</div>
			</div>

			<div className=" ">
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
									Nom
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Prénom
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Email
								</th>

								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Téléphone
								</th>
								<th
									style={{
										textAlign: "center",
										width: "200px",
									}}
								>
									Rôle
								</th>
								<th
									style={{
										textAlign: "center",
										width: "250px",
									}}
								>
									Formation
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
									Outils
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredUsers.map((user, index) => (
								<tr key={user.id}>
									<td style={{ textAlign: "center" }}>
										{index + 1}
									</td>
									<td style={{ textAlign: "center" }}>
										{editingUserId === user.id ? (
											<input
												type="text"
												value={editedName}
												onChange={(e) =>
													setEditedName(
														e.target.value
													)
												}
												className="form-control"
											/>
										) : (
											user.name
										)}
									</td>
									<td style={{ textAlign: "center" }}>
										{editingUserId === user.id ? (
											<input
												type="text"
												value={editedSurname}
												onChange={(e) =>
													setEditedSurname(
														e.target.value
													)
												}
												className="form-control"
											/>
										) : (
											user.surname
										)}
									</td>

									<td style={{ textAlign: "center" }}>
										{editingUserId === user.id ? (
											<input
												style={{ width: "200px" }}
												type="email"
												value={editedEmail}
												onChange={(e) =>
													setEditedEmail(
														e.target.value
													)
												}
												className="form-control"
											/>
										) : (
											user.email
										)}
									</td>
									<td style={{ textAlign: "center" }}>
										{editingUserId === user.id ? (
											<input
												type="tel"
												value={editedTel}
												onChange={(e) =>
													setEditedTel(e.target.value)
												}
												className="form-control"
											/>
										) : (
											user.tel
										)}
									</td>
									<td style={{ textAlign: "center" }}>
										{user.role}
									</td>

									<td style={{ textAlign: "center" }}>
										{user.role === "Student"
											? renderFormationsOrCourses(user)
											: "-"}
									</td>
									<td style={{ textAlign: "center" }}>
										{user.role === "Teacher"
											? renderFormationsOrCourses(user)
											: "-"}
									</td>
									<td>
										<div className="buttons">
											{editingUserId === user.id ? (
												<>
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
															onClick={() =>
																saveChanges(
																	user.id
																)
															}
															style={{
																display: "flex",
																justifyContent:
																	"center",

																backgroundColor:
																	"#40b9af",
																border: "none",
															}}
														>
															<IoSaveOutline />
														</Button>
													</OverlayTrigger>
												</>
											) : (
												<OverlayTrigger
													placement="top"
													overlay={
														<Tooltip
															id={`tooltip-edit`}
														>
															Editer
														</Tooltip>
													}
												>
													<Button
														onClick={() =>
															startEditing(user)
														}
														style={{
															display: "flex",
															justifyContent:
																"center",
															backgroundColor:
																"#40b9af",
															border: "none",
														}}
													>
														<FaRegEdit />
													</Button>
												</OverlayTrigger>
											)}
											<OverlayTrigger
												placement="top"
												overlay={
													<Tooltip
														id={`tooltip-delete-${user.id}`}
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
														backgroundColor:
															"#dc3545",
														border: "none",
													}}
													onClick={() => {
														handleDeleteUser(
															user.id
														);
													}}
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
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center" }}>
						Ajouter un nouveau membre
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col md={6}>
								<Form.Group controlId="formNom">
									<Form.Label>
										<strong>Nom</strong>
									</Form.Label>
									<Form.Control
										type="text"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId="formEmail">
									<Form.Label>
										<strong>Email</strong>
									</Form.Label>
									<Form.Control
										placeholder="ex: exemple@mail.com"
										as="input"
										type="email"
										value={email}
										onChange={validateEmail}
										isInvalid={!!emailError}
									/>
									<Form.Control.Feedback type="invalid">
										{emailError}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="formPrenom">
									<Form.Label>
										<strong>Prénom</strong>
									</Form.Label>
									<Form.Control
										as="input"
										value={surname}
										onChange={(e) =>
											setSurname(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId="formTelephone">
									<Form.Label>
										<strong>Téléphone</strong>
									</Form.Label>
									<Form.Control
										placeholder="ex: +32"
										as="input"
										value={phoneNumber}
										onChange={validatePhone}
										isInvalid={!!phoneError}
									/>
									<Form.Control.Feedback type="invalid">
										{phoneError}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button
						variant="danger"
						onClick={handleCloseModal}
						style={{ border: "none" }}
					>
						Annuler
					</Button>
					<Button
						variant="primary"
						onClick={handleCreateUser}
						style={{ backgroundColor: "#5c9b9e", border: "none" }}
					>
						Ajouter
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showModalRole} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title style={{ textAlign: "center" }}>
						Ajout du rôle
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col md={6}>
								<Form.Group controlId="formUser">
									<Form.Label>
										<strong>Utilisateurs</strong>
									</Form.Label>
									<Form.Control
										as="select"
										value={selectedUser}
										onChange={(e) =>
											setSelectedUser(
												parseInt(e.target.value)
											)
										}
									>
										<option value="" hidden>
											Choisie un utilisateurs
										</option>
										{usersNoRole.map((user) => (
											<option
												key={user.id}
												value={user.id}
											>
												{user.name}
											</option>
										))}
									</Form.Control>
								</Form.Group>

								<Form.Group controlId="formRole">
									<Form.Label>
										<strong>Rôle</strong>
									</Form.Label>
									<Form.Control
										as="select"
										value={role}
										onChange={(e) =>
											setRole(e.target.value)
										}
									>
										<option value="" hidden>
											Choisie un rôle
										</option>
										{roles.map((role) => (
											<option
												key={role.id}
												value={role.name}
											>
												{role.name}
											</option>
										))}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								{role === "Student" && (
									<Form.Group controlId="formFormation">
										<Form.Label>
											<strong>Formation</strong>
										</Form.Label>
										<Form.Control
											as="select"
											value={selectedFormation}
											onChange={(e) =>
												setSelectedFormation(
													parseInt(e.target.value)
												)
											}
										>
											<option value="" hidden>
												Choisie une formation
											</option>
											{formations.map((formation) => (
												<option
													key={formation.id}
													value={formation.id}
												>
													{formation.name}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								)}

								{role === "Teacher" && (
									<FormGroup controlId="formCourses">
										<Form.Label>
											<strong>Courses</strong>{" "}
										</Form.Label>
										<div className="checkbox-padding">
											{courses.map((course) => (
												<FormCheck
													key={course.id}
													type="checkbox"
													label={course.name}
													value={course.id}
													checked={selectedCourses.includes(
														course.id
													)}
													onChange={() =>
														handleCourseSelection(
															course.id
														)
													}
												/>
											))}
										</div>
									</FormGroup>
								)}
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button
						variant="danger"
						onClick={handleCloseModal}
						style={{ border: "none" }}
					>
						Annuler
					</Button>
					<Button
						variant="primary"
						onClick={handleCreateUser}
						style={{ backgroundColor: "#5c9b9e", border: "none" }}
					>
						Ajouter
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default MembersFilter;
