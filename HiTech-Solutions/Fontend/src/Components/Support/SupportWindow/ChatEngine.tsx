import React, { useEffect, useState } from "react";
import { ChatEngineWrapper, ChatFeed, Socket } from "react-chat-engine";

const ChatEngine = (props: any) => {
	const [showChat, setShowChat] = useState(false);
	// console.log(props.chat.id);

	useEffect(() => {
		if (props.visible) {
			setTimeout(() => {
				setShowChat(true);
			}, 500);
		}
	});
	return (
		<div
			className="transition-5"
			style={{
				height: props.visible ? "100%" : "0%",
				zIndex: props.visible ? "100" : "0",
				width: "100%",
				backgroundColor: "white",
			}}
		>
			{showChat && (
				<ChatEngineWrapper>
					<Socket
						projectID={"53273278-0b2b-425c-b78e-6532ca531c19"}
						userName={props.user.email}
						userSecret={props.user.email}
					/>
					<ChatFeed activeChat={props.chat.id} />
				</ChatEngineWrapper>
			)}
		</div>
	);
};

export default ChatEngine;
