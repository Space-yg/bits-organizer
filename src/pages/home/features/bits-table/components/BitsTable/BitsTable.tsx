import React, { useState } from "react"
import OrganizedBitsGroup from "../OrganizedBitsGroup"
import UnorganizedBitsGroup from "../UnorganizedBitsGroup"
import type { Updater } from "use-immer"
import type { BitsOrganization } from "!/types"

import "./styles.scss"

type View = "grid" | "separate"

type Props = {
	bitsOrganizations: BitsOrganization[]
	setBitsOrganizations: Updater<BitsOrganization[]>
	data: number[]
}

export default function BitsTable({ bitsOrganizations, setBitsOrganizations, data }: Props) {
	const [view, setView] = useState<View>("grid")
	const bitsGrouped: React.JSX.Element[] = []

	let added: boolean
	for (let i = 0; i < data.length; i++) {
		added = false
		for (const bitsOrganization of bitsOrganizations) {
			// Are part of bitsOrganizations
			if (bitsOrganization.startBit === i) {
				bitsGrouped.push(
					<OrganizedBitsGroup key={i} bitsOrganization={bitsOrganization} setBitsOrganizations={setBitsOrganizations} data={data} />
				)
				i += bitsOrganization.length - 1
				added = true
				break
			}
		}

		// Are NOT part of bitsOrganizations
		if (!added) {
			bitsGrouped.push(
				<UnorganizedBitsGroup key={i} bit={data[i]} />
			)
		}
	}

	return (
		<>
			<h2>Bits Table</h2>

			{/* Change view */}
			<label>
				<span>View: </span>
				<select name="view" value={view} onInput={e => setView(e.currentTarget.value as View)}>
					<option value="grid">Grid</option>
					<option value="separate">Separate</option>
				</select>
			</label>

			{/* Table */}
			<div className={"bits " + view}>
				{bitsGrouped}
			</div>
		</>
	)
}