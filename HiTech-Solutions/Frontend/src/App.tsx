import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "../src/Components/Admin/index";
import Home from "./Components/Home/Home";
import OurServices from "./Components/Home/OurServices";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import NavBar from "./Components/Navbar/Navbar";

// import Navbar from "./Components/Navbar/Navbar";
// import Services from "./Components/Services/Services";

// import logo from "./logo.svg";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ourServices" element={<OurServices />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/NavBar" element={<NavBar />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</Router>
	);
}

export default App;
