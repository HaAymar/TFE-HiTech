import "./LoginSignup.css";

import React, { useState } from "react";

import emailIcon from "../../Assets/email.png";
import logo from "../../Assets/logo.svg";
import passIcon from "../../Assets/password.png";
import userIcon from "../../Assets/person.png";

const LoginSignup = () => {
	const [action, setAction] = useState("Sign up");

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
						<input type="text" placeholder="Name" />
					</div>
				)}
				<div className="input">
					<img src={emailIcon} alt="" />
					<input type="email" placeholder="Email" />
				</div>
				<div className="input">
					<img src={passIcon} alt="" />
					<input type="password" placeholder="Password" />
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
