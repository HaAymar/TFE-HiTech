import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";

import Drawer from "../Admin/Drawers/index";

interface DecodedToken {
	RoleName: string;
}

const RoleDrawer: React.FC = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	if (!token) {
		navigate("/login");
		return null;
	}

	const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
	const role = decoded.RoleName;
	switch (role) {
		case "Teacher":
			return <Drawer role="teacher" />;
		case "Admin":
			return <Drawer role="admin" />;
		default:
			navigate("/");
			return null;
	}
};

export default RoleDrawer;
