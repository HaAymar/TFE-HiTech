import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "./Components/Admin/CreateTrainings/index";
import MembersFilter from "./Components/Admin/Members/index";
import ChatBox from "./Components/chats/index";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/index";
import OurServices from "./Components/Home/index";
import Login from "./Components/LoginSignup/index";
import NavBar from "./Components/Navbar/index";
import ProtectedRoute from "./Components/ProtectedRoute";
import RoleDrawer from "./Components/RoleDrawer/index";
import Services from "./Components/Services/index";
import StudentPage from "./Components/Student/index";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ourServices" element={<OurServices />} />
				<Route path="/NavBar" element={<NavBar />} />
				<Route path="/admin" element={<Admin />} />
				<Route
					path="/drawer"
					element={
						<ProtectedRoute
							element={RoleDrawer}
							allowedRoles={["Teacher", "Admin"]}
						/>
					}
				/>

				<Route path="/formation" element={<Services />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/student" element={<StudentPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chatBox" element={<ChatBox />} />
				<Route path="/members" element={<MembersFilter />} />
			</Routes>
		</Router>
	);
}

export default App;
