import React, { KeyboardEvent, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";

interface Message {
	text: string;
	sender: "user" | "bot";
}

const ChatBox: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");

	const sendMessage = async () => {
		if (input.trim()) {
			const newMessage: Message = { text: input, sender: "user" };
			const botResponse: Message = {
				text: `Echo: ${input}`,
				sender: "bot",
			};

			setMessages([...messages, newMessage]);
			setInput("");

			setTimeout(() => {
				setMessages((messages) => [...messages, botResponse]);
			}, 1000);
		}
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	};

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={8} lg={6}>
					<ListGroup>
						{messages.map((msg, index) => (
							<ListGroup.Item
								key={index}
								className={`text-${
									msg.sender === "user" ? "right" : "left"
								}`}
							>
								{msg.text}
							</ListGroup.Item>
						))}
					</ListGroup>
					<Form>
						<Row className="align-items-center">
							<Col>
								<Form.Control
									type="text"
									placeholder="Type a message..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyPress={handleKeyPress}
								/>
							</Col>
							<Col xs="auto">
								<Button onClick={sendMessage} variant="primary">
									Send
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default ChatBox;
