import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Formations from "./Components/Admin/CreateTrainings/index";
import DefaultDrawer from "./Components/Admin/Drawers/default";
import Members from "./Components/Admin/Members/index";
import Chart from "./Components/chats/index";
import Home from "./Components/Home/index";
import Login from "./Components/LoginSignup/index";
import Page404 from "./Components/Page 404/index";
import ProtectedRoute from "./Components/ProtectedRoute";
import RoleDrawer from "./Components/RoleDrawer/index";
import FormationService from "./Components/Services/index";
import FormulerTest from "./Components/Teacher/index";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/formation",
		element: <FormationService />,
	},
	{
		path: "/chat",
		element: <Chart />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/student",
		element: (
			<ProtectedRoute element={RoleDrawer} allowedRoles={["Student"]} />
		),
	},
	{
		path: "drawer",
		element: (
			<ProtectedRoute
				element={RoleDrawer}
				allowedRoles={["Teacher", "Admin"]}
			/>
		),
		children: [
			{
				path: "",
				element: <DefaultDrawer />,
			},
			{
				path: "members",
				element: <Members />,
			},
			{
				path: "formations",
				element: <Formations />,
			},
			{
				path: "teacher",
				element: <FormulerTest />,
			},
		],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<RouterProvider router={router} />
		</RecoilRoot>
	</React.StrictMode>
);
