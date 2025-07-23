import React from "react"
import Info from "../Info/Info"
import type { BitsOrganization } from "!/types"

import "./styles.scss"

type Props = {
	bitsOrganizations: BitsOrganization[]
	data: number[]
}

export default function InfoDisplay({ bitsOrganizations, data }: Props) {
	const selectedBitsOrganization = bitsOrganizations.find(bitsOrganization => bitsOrganization.highlight !== "off")

	return (
		<>
			<h2>Information</h2>

			{selectedBitsOrganization &&
				<Info bitsOrganization={selectedBitsOrganization} binaryNumber={data.slice(selectedBitsOrganization.startBit, selectedBitsOrganization.startBit + selectedBitsOrganization.length).map(bit => bit + "").join("")} />
			}
		</>
	)
}