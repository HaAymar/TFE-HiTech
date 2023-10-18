import React, { useEffect, useRef, useState } from "react";

import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";

const Support = () => {
	const ref = useRef<any>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setVisible(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return (
		<div ref={ref}>
			<SupportWindow visible={visible} />
			<Avatar
				onClick={() => setVisible(true)}
				style={{ position: "fixed", bottom: "24px", right: "24px" }}
			/>
		</div>
	);
};

export default Support;
