import "./style.css";

import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { MdEmail } from "react-icons/md"; // Icone d'email de Material Icons
import { RiLockPasswordLine } from "react-icons/ri"; // Icone de mot de passe de Remix Icon

import Logo from "../../Assets/pp.svg";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Traitement de la connexion ici
		console.log(email, password);
	};

	return (
		<div className="login-page">
			<div className="logo-container">
				<img src={Logo} alt="Logo HiTech-Solutions" />
			</div>
			<Container className="ContLogin">
				<h2 className="mb-4 text-center">Connexion</h2>
				<div className="d-flex justify-content-center">
					<Form onSubmit={handleSubmit}>
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
