import React from "react"
import { Footer } from "@/components/layout"

import "./Version.scss"

type Props = {}

export default function Version({ }: Props) {
	return (
		<>
			<h1>Versions</h1>

			<h2>0.0.2</h2>

			<ul>
				<li>Migrated the website from vanilla TypeScript to React.js with TypeScript.</li>
				<li>You can now hover over the color of an organization bit to highlight the color in the bits table.</li>
				<li>Adding an organization bit now starts with the last bit's end bit + 1.</li>
				<li>You can now click on a color to keep it highlighted.</li>
				<li>You can now write the input data in different formats.</li>
				<li>You can now write the input data with different delimiters.</li>
				<li>You can now enter a hexadecimal, octal, or binary number to create the bits table.</li>
				<li>You can now change the view of the bits table to view it in grid mode or separate mode.</li>
			</ul>

			<h2>0.0.1</h2>

			<ul>
				<li>Created the website.</li>
				<li>You can create bits organizations to organize each bit.</li>
				<li>You can enter a hexadecimal number to create the bits table.</li>
				<li>You can see the hexadecimal, binary, octal, decimal, and ASCII of a set of bits.</li>
			</ul>

			<Footer />
		</>
	)
}