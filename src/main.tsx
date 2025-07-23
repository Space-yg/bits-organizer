import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.tsx"

import "./index.scss"

console.log("Hi! Welcome to my website :)")

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter basename="/bits-organizer">
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)
