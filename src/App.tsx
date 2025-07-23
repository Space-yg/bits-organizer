import React from "react"
import { Route, Routes } from "react-router"
import Home from "./pages/home"
import Version from "./pages/version"

import "./App.scss"

type Props = {}

export default function App({ }: Props) {
	return (
		<>
			{/* For styling */}
			<div className="root">
				<Routes>
					<Route index element={<Home />} />
					<Route path="/version" element={<Version />} />
				</Routes>
			</div>
		</>
	)
}