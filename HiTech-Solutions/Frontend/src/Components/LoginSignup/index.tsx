import "./style.css";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import Logo from "../../Assets/pp.svg";
import { userIdState } from "../Stores/userIdState";

interface CustomJwtPayload {
	RoleName: string;
	UserId: number;
}

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [userC, setUserC] = useState<number>(0);
	const setUserId = useSetRecoilState(userIdState);
	const navigate = useNavigate();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Empêche le rechargement de la page
		try {
			const response = await axios.post(
				"http://localhost:3001/auth/login",
				{ email, password },
				{ headers: { "Content-Type": "application/json" } }
			);

			const token = response.data;
			console.log("Token:", token);

			if (token) {
				const user: CustomJwtPayload =
					jwtDecode<CustomJwtPayload>(token);
				localStorage.setItem("token", token);
				console.log("User login", user.UserId);
				setUserC(user.UserId);
				setUserId(user.UserId);
				console.log("User login", user.UserId);
				if (user.RoleName === "Student") {
					navigate("/student");
				} else if (
					user.RoleName === "Teacher" ||
					user.RoleName === "Admin"
				) {
					navigate("/drawer");
				} else {
					navigate("/");
				}
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error("Failed to login:", error.response.data);
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
						<Form.Group controlId="formBasicEmail" className="mb-3">
							<Form.Label>E-mail</Form.Label>
							<InputGroup className="inputForm">
								<InputGroup.Text>
									<MdEmail />
								</InputGroup.Text>
								<Form.Control
									type="email"
									placeholder="Entrez votre email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputGroup>
						</Form.Group>

						<Form.Group
							controlId="formBasicPassword"
							className="mb-3"
						>
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
						<div className="d-flex justify-content-center">
							<Button
								style={{
									backgroundColor: "#5c9b9e",
									border: "none",
								}}
								type="submit"
								className="w-30"
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
