import React from "react"
import { Link } from "react-router"

import "./styles.scss"

type Props = {}

export default function Footer({ }: Props) {
	return (
		<footer>
			<Link to={"/version"}>Version</Link>
		</footer>
	)
}