import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
	element: React.ComponentType;
	allowedRoles: string[];
}

interface DecodedToken {
	RoleName: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	element: Component,
	allowedRoles,
}) => {
	const location = useLocation();
	const userToken = localStorage.getItem("token");
	let userRole = "";

	if (userToken) {
		const decoded: DecodedToken = jwtDecode<DecodedToken>(userToken);
		userRole = decoded.RoleName;
	}

	return allowedRoles.includes(userRole) ? (
		<Component />
	) : (
		<Navigate to="/login" />
	);
};

export default ProtectedRoute;
