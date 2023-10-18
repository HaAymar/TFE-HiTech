import React, { useState } from "react";

import { styles } from "../styles";
import ChatEngine from "./ChatEngine";
import EmailForm from "./EmailForm";

const SupportWindow = (props: any) => {
	const [user, setUser] = useState<any>(null);
	const [chat, setChat] = useState<any>(null);

	return (
		<div
			style={{
				...styles.supportWindow,
				...{ opacity: props.visible ? "1" : "0", position: "fixed" },
			}}
		>
			<EmailForm
				setUser={(user: any) => setUser(user)}
				setChat={(chat: any) => setChat(chat)}
				visible={user === null || chat === null}
			/>

			<ChatEngine
				visible={user !== null && chat !== null}
				chat={chat}
				user={user}
			/>
		</div>
	);
};

export default SupportWindow;
