import "./style.css";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import Logo from "../../Assets/pp.svg";
import { BE_URL } from "../../config";
import { userNameState } from "../Stores/nameUser";
import { userIdState } from "../Stores/userIdState";

interface CustomJwtPayload {
	RoleName: string;
	UserId: number;
	Name: string;
	Surname: string;
}

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const setUserId = useSetRecoilState(userIdState);
	const navigate = useNavigate();
	const [, setUserName] = useRecoilState(userNameState);
	console.log(BE_URL);
	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(email);
		try {
			const response = await axios.post(
				`${BE_URL}auth/login`,
				{ email, password },
				{ headers: { "Content-Type": "application/json" } }
			);

			const token = response.data;
			console.log("Token:", token);

			if (token) {
				const user: CustomJwtPayload =
					jwtDecode<CustomJwtPayload>(token);
				localStorage.setItem("token", token);

				const initials = user.Name.charAt(0) + user.Surname.charAt(0);
				const fullName = `${user.Name} ${user.Surname}`;
				console.log("User login", initials);
				setUserName(fullName);
				// navigate(`/student?initials=${initials}`);

				setUserId(user.UserId);
				console.log("User login", user.UserId);
				if (user.RoleName === "Student") {
					navigate(`/student?initials=${initials}`);
				} else if (
					user.RoleName === "Teacher" ||
					user.RoleName === "Admin"
				) {
					navigate(`/drawer?initials=${initials}`);
				} else {
					navigate("/");
				}
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error("Failed to login:", error.response.data);
					setError("*Identification invalide!");
				} else if (error.request) {
					console.error("No response received:", error.request);
				} else {
					console.error("Error setting up request:", error.message);
				}
			} else {
				console.error("An unexpected error occurred:", error);
			}
		}
	};

	return (
		<div className="login-page">
			<div className="logo-container">
				<img src={Logo} alt="Logo HiTech-Solutions" />
			</div>
			<Container className="ContLogin">
				<h2 className="mb-4 text-center">Connexion</h2>
				<div className="d-flex justify-content-center">
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-4">
							<Form.Label>E-mail</Form.Label>
							<InputGroup className="inputForm">
								<InputGroup.Text>
									<MdEmail />
								</InputGroup.Text>
								<Form.Control
									type="email"
									placeholder="Entrez votre email"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value.trim())
									}
								/>
							</InputGroup>
						</Form.Group>

						<Form.Group className="mb-4">
							<Form.Label>Mot de passe</Form.Label>
							<InputGroup className="inputForm">
								<InputGroup.Text>
									<RiLockPasswordLine />
								</InputGroup.Text>
								<Form.Control
									type="password"
									placeholder="Mot de passe"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</InputGroup>
						</Form.Group>
						<p
							className="d-flex justify-content-center"
							style={{ color: "red" }}
						>
							{error}
						</p>
						<div className="d-flex justify-content-center">
							<Button
								type="submit"
								className="w-50"
								style={{
									backgroundColor: "#5c9b9e",
									border: "none",
								}}
							>
								Connexion
							</Button>
						</div>
					</Form>
				</div>
				<div className="mt-3 text-center">
					<a
						style={{
							color: "#5c9b9e",
						}}
						href="#forgot-password"
					>
						Mot de passe oublié ?
					</a>
				</div>
			</Container>
		</div>
	);
};

export default LoginPage;
