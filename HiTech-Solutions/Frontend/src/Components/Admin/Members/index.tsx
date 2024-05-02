import "./style.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Container,
	Dropdown,
	DropdownButton,
	Form,
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

import { fetchUsers } from "../../Stores/usersState";

interface Formation {
	formationId: number;
	formationName: string;
}

interface Course {
	courseId: number;
	courseName: string;
}

interface UserDetail {
	formations?: Formation[];
	courses?: Course[];
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
	const [editingUserId, setEditingUserId] = useState<number | null>(null);
	const [editedName, setEditedName] = useState<string>("");
	const [editedSurname, setEditedSurname] = useState<string>("");
	const [editedEmail, setEditedEmail] = useState<string>("");
	const [editedTel, setEditedTel] = useState<string>("");

	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");

	const [email, setEmail] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [selectedRole, setSelectedRole] = useState<string>("");
	const allUsers = useRecoilValue<User[]>(fetchUsers);

	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [showModalForm, setShowModalForm] = useState<boolean>(false);

	console.log("All user", allUsers);
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
			const response = await axios.post(
				"http://localhost:3001/users",
				newUser,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
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
			await axios.delete(`http://localhost:3001/users/${userId}`, {
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
			await axios.put(
				`http://localhost:3001/users/${userId}`,
				updatedUser
			);
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
			style={{ width: "80%", backgroundColor: "#dadde0" }}
		>
			<div className="headerMembers">
				<div>
					<h4>
						<b>Administration des Membres</b>
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
					<DropdownButton
						id="dropdown-basic-button"
						title="Options"
						variant="secondary"
						className="small-dropdown"
					>
						<Dropdown.Item
							href="#/action-1"
							className="small-dropdown"
						>
							Ajouter rôle
						</Dropdown.Item>
						<Dropdown.Item
							href="#/action-2"
							className="small-dropdown"
						>
							Assign a Course to Teacher
						</Dropdown.Item>
						<Dropdown.Item
							href="#/action-3"
							className="small-dropdown"
						>
							Assign a Formation to Student
						</Dropdown.Item>
					</DropdownButton>
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
										width: "200px",
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
						Ajouter un nouveau utilisateur
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col md={6}>
								<Form.Group controlId="formNom">
									<Form.Label>Nom</Form.Label>
									<Form.Control
										type="text"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId="formEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										as="input"
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="formPrenom">
									<Form.Label>Prénom</Form.Label>
									<Form.Control
										as="input"
										value={surname}
										onChange={(e) =>
											setSurname(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId="formTelephone">
									<Form.Label>Téléphone</Form.Label>
									<Form.Control
										as="input"
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
									/>
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
		</Container>
	);
};

export default MembersFilter;
