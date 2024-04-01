import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "./Components/Admin/CreateTrainings/index";
import Drawer from "./Components/Admin/Drawers/index";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/index";
import OurServices from "./Components/Home/index";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import NavBar from "./Components/Navbar/index";
import Services from "./Components/Services/index";
import StudentPage from "./Components/Student/index";
import FormulaireTest from "./Components/Teacher/index";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ourServices" element={<OurServices />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/NavBar" element={<NavBar />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/drawer" element={<Drawer role="teacher" />} />
				<Route path="/formation" element={<Services />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/test" element={<FormulaireTest />} />
				<Route path="/student" element={<StudentPage />} />
			</Routes>
		</Router>
	);
}

export default App;
