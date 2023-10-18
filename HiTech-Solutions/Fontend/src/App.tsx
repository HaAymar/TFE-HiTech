import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Home/Home";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
// import Navbar from "./Components/Navbar/Navbar";
// import Services from "./Components/Services/Services";
import Support from "./Components/Support/Support";
import SupportAdmin from "./Components/Support/SupportAdmin/SupportAdmin";

// import logo from "./logo.svg";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/Support" element={<Support />} />
				<Route path="/Admin" element={<SupportAdmin />} />
			</Routes>
		</Router>
	);
}

export default App;
