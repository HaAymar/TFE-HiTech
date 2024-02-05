import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

// import Connexion from "./Components/Connexion/Connexion";
// import Contact from "./Components/Contact/Contact";
import App from "./App";
// import Home from "./Components/Home/Home";
// import Navbar from "./Components/Navbar/Navbar";
// import Services from "./Components/Services/Services";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
