import React from "react"
import type { BitsOrganization } from "!/types"

import "./styles.scss"

type Props = {
	bitsOrganization: BitsOrganization
	binaryNumber: string
}

export default function Info({ bitsOrganization, binaryNumber }: Props) {
	const decimal: number = parseInt(binaryNumber, 2)

	let ascii
	try {
		ascii = String.fromCodePoint(decimal)
	} catch {
		ascii = "Unknown"
	}

	return (
		!isNaN(decimal) && <>
			<p>Binary: {decimal.toString(2).padStart(bitsOrganization.length, "0")}</p>
			<p>Decimal: {decimal}</p>
			<p>Octal: {decimal.toString(8).padStart(Math.ceil(bitsOrganization.length / 3), "0")}</p>
			<p>Hexadecimal: {decimal.toString(16).padStart(Math.ceil(bitsOrganization.length / 4), "0")}</p>
			<p>ASCII: {ascii}</p>
		</>
	)
}