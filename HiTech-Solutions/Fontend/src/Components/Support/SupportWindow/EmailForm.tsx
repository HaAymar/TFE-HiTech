import axios from "axios";
import React, { useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import Avatar from "../Avatar";
import { styles } from "../styles";

const EmailForm = (props: any) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const getOrCreateUser = (callback: any) => {
		axios
			.put(
				"https://api.chatengine.io/users/",
				{
					username: email,
					secret: email,
					email: email,
				},
				{
					headers: {
						"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY,
					},
				}
			)
			.then((r) => callback(r.data));
	};

	const getOrCreateChat = (callback: any) => {
		axios
			.put(
				"https://api.chatengine.io/chats/",
				{
					usernames: ["Admin HiTech", email],
					is_direct_chat: true,
				},
				{
					headers: {
						"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY,
					},
				}
			)
			.then((r) => callback(r.data));
	};

	const stripeStyle: React.CSSProperties = {
		position: "relative",
		top: "-45px",
		width: "100%",
		height: "308px",
		backgroundColor: "#7a39e0",
		transform: "skewY(-12deg)",
	};

	const loadingDiv: React.CSSProperties = {
		position: "absolute",
		height: "100%",
		width: "100%",
		textAlign: "center",
		backgroundColor: "white",
	};

	const loadingIcon: React.CSSProperties = {
		color: "#7a39e0",
		position: "absolute",
		top: "calc(50% - 51px)",
		left: "calc(50% - 51px)",
		fontWeight: "600",
	};

	const topText: React.CSSProperties = {
		position: "relative",
		width: "100%",
		top: "15%",
		color: "white",
		fontSize: "24px",
		fontWeight: "600",
	};

	const emailInput: React.CSSProperties = {
		width: "66%",
		textAlign: "center",
		outline: "none",
		padding: "12px",
		borderRadius: "12px",
		border: "2px solid #7a39e0",
	};

	const bottomText: React.CSSProperties = {
		position: "absolute",
		width: "100%",
		top: "60%",
		color: "#7a39e0",
		fontSize: "24px",
		fontWeight: "600",
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		setLoading(true);
		console.log("Sending email", email);

		getOrCreateUser((user: any) => {
			props.setUser(user);
			getOrCreateChat((chat: any) => props.setChat(chat));
		});
	};

	return (
		<div
			style={{
				...styles.emailFormWindow,
				...{
					height: props.visible ? "100%" : "0%",
					opacity: props.visible ? "1" : "0",
				},
			}}
		>
			<div style={{ height: "0px" }}>
				<div style={stripeStyle} />
			</div>

			<div
				className="transition-5"
				style={{
					...loadingDiv,
					...{
						zIndex: loading ? "10" : "-1",
						opacity: loading ? "0.33" : "0",
					},
				}}
			>
				<LoadingOutlined
					className="transition-5"
					style={{
						...loadingIcon,
						...{
							zIndex: loading ? "10" : "-1",
							opacity: loading ? "1" : "0",
							fontSize: "82px",
							top: "calc(50% - 41px)",
							left: "calc(50% - 41px)",
						},
					}}
				/>
			</div>

			<div
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					textAlign: "center",
				}}
			>
				<Avatar
					style={{
						position: "relative",
						left: "calc(50% - 44px)",
						top: "10%",
					}}
				/>

				<div style={topText}>
					Welcome to my <br />
					support 👋🏽
				</div>
				<form
					onSubmit={(e) => handleSubmit(e)}
					style={{
						position: "relative",
						width: "100%",
						top: "19.75%",
					}}
				>
					<input
						style={emailInput}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your mail"
					/>
				</form>

				<div style={bottomText}>
					Enter your email <br /> to get started
				</div>
			</div>
		</div>
	);
};

export default EmailForm;
