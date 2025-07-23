import React, { memo, useState } from "react"
import { defaultOrganizationTableEntry } from "!/utils/helpers"
import OrganizationTableEntry from "../OrganizationTableEntry/OrganizationTableEntry"
import type { Updater } from "use-immer"
import type { BitsOrganization } from "!/types"

import "./styles.scss"

type Props = {
	bitsOrganizations: BitsOrganization[]
	setBitsOrganizations: Updater<BitsOrganization[]>
}

const OrganizationTable = memo(function OrganizationTable({ bitsOrganizations, setBitsOrganizations }: Props) {
	const [latestBitsOrganizationsId, setLatestBitsOrganizationsId] = useState<number>(1) // The first one is already 0

	return (
		<>
			<h2>Organization Table</h2>
			<table className="organization-table">
				<thead>
					<tr>
						<th>Remove</th>
						<th>Add</th>
						<th>Name</th>
						<th>Start Bit</th>
						<th>Length</th>
						<th>Color</th>
					</tr>
				</thead>
				<tbody>
					{bitsOrganizations.map(bitsOrganization =>
						<OrganizationTableEntry
							key={bitsOrganization.id}
							bitsOrganization={bitsOrganization}
							setBitsOrganizations={setBitsOrganizations}
							latestBitsOrganizationsId={latestBitsOrganizationsId}
							setLatestBitsOrganizationsId={setLatestBitsOrganizationsId}
						/>)
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={6}>
							<button type="button" onClick={() => {
								setBitsOrganizations(draft => {
									draft.push(defaultOrganizationTableEntry(latestBitsOrganizationsId, bitsOrganizations))
								})
								setLatestBitsOrganizationsId(latestBitsOrganizationsId + 1)
							}}>+</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	)
})

export default OrganizationTable