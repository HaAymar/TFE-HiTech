import "./LoginSignup.css";

import React, { useState } from "react";

import emailIcon from "../../Assets/email.png";
import passIcon from "../../Assets/password.png";
import userIcon from "../../Assets/person.png";

const LoginSignup = () => {
	const [action, setAction] = useState("Sign up");

	// ------ Formular ------- //
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let data = [{ name: name, email: email, password: password }];
	console.log(data);

	const SignUp = () => {
		if (action === "Login") {
			setAction("Sign up");
		}
	};

	const Login = () => {
		if (action === "Sign up") {
			setAction("Login");
		}
	};

	return (
		<div className="container">
			<div className="header">
				<div className="text">{action}</div>
				<div className="underline"></div>
			</div>
			<div className="inputs">
				{action === "Login" ? (
					""
				) : (
					<div className="input">
						<img src={userIcon} alt="" />
						<input
							type="text"
							value={name}
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				)}
				<div className="input">
					<img src={emailIcon} alt="" />
					<input
						type="email"
						value={email}
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="input">
					<img src={passIcon} alt="" />
					<input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			{action === "Login" ? (
				<div className="forgot-password">
					Lost Password <span>Click Here</span>
				</div>
			) : (
				""
			)}

			<div className="submit-container">
				<div
					className={action === "Login" ? "submit gray" : "submit"}
					onClick={SignUp}
				>
					Sign Up
				</div>
				<div
					className={action === "Sign up" ? "submit gray" : "submit"}
					onClick={Login}
				>
					Login
				</div>
			</div>
		</div>
	);
};

export default LoginSignup;
