import React from "react"

import "./styles.scss"

type Props = {}

export default function Footer({ }: Props) {
	return (
		<footer>
			<a href={import.meta.env.BASE_URL + "/version"}>Version</a>
		</footer>
	)
}