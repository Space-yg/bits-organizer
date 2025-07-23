import React, { memo, useState } from "react"
import { original } from "immer"
import { InputNumber } from "@/components/form"
import { defaultOrganizationTableEntry, getElementFromDraftArray } from "!/utils/helpers"
import type { Updater } from "use-immer"
import type { BitsOrganization } from "!/types"

import "./styles.scss"

type Props = {
	bitsOrganization: BitsOrganization
	setBitsOrganizations: Updater<BitsOrganization[]>
	latestBitsOrganizationsId: number
	setLatestBitsOrganizationsId: React.Dispatch<React.SetStateAction<number>>
}

const OrganizationTableEntry = memo(function OrganizationTableEntry({ bitsOrganization, setBitsOrganizations, latestBitsOrganizationsId, setLatestBitsOrganizationsId }: Props) {
	const [startBit, setStartBit] = useState<string>(bitsOrganization.startBit + "")
	const [length, setLength] = useState<string>(bitsOrganization.length + "")

	return (
		<tr>
			{/* Remove */}
			<td><button onClick={() => setBitsOrganizations(draft => {
				draft.splice(original(draft)!.indexOf(bitsOrganization), 1)
			})}>x</button></td>

			{/* Add */}
			<td>
				{/* Above */}
				<button onClick={() => {
					setBitsOrganizations(draft => {
						draft.splice(original(draft)!.indexOf(bitsOrganization), 0, defaultOrganizationTableEntry(latestBitsOrganizationsId, draft))
					})
					setLatestBitsOrganizationsId(latestBitsOrganizationsId + 1)
				}}>Add above</button>

				{/* Below */}
				<button onClick={() => {
					setBitsOrganizations(draft => {
						let index = original(draft)!.indexOf(bitsOrganization)
						if (index === draft.length) draft.push(defaultOrganizationTableEntry(latestBitsOrganizationsId, draft))
						else draft.splice(index + 1, 0, defaultOrganizationTableEntry(latestBitsOrganizationsId, draft))
					})
					setLatestBitsOrganizationsId(latestBitsOrganizationsId + 1)
				}}>Add below</button>
			</td>

			{/* Name */}
			<td><input type="text" placeholder="Name" value={bitsOrganization.name} onInput={e => {
				const value: typeof bitsOrganization.name = e.currentTarget.value
				setBitsOrganizations(draft => {
					getElementFromDraftArray(draft, bitsOrganization)!.name = value
				})
			}} /></td>

			{/* Start bit */}
			<td>
				<InputNumber
					defaultValue={startBit}
					onInput={e => {
						setStartBit(e.currentTarget.value)

						const value: typeof bitsOrganization.startBit = +e.currentTarget.value
						setBitsOrganizations(draft => {
							const bits = getElementFromDraftArray(draft, bitsOrganization)
							if (bits) bits.startBit = value
						})
					}}
					min={0}
					placeholder="Start bit"
				/>
			</td>

			{/* Length */}
			<td>
				<InputNumber
					value={length}
					onInput={e => {
						setLength(e.currentTarget.value)

						const value: typeof bitsOrganization.length = +e.currentTarget.value
						if (!isNaN(value)) setBitsOrganizations(draft => {
							const bits = getElementFromDraftArray(draft, bitsOrganization)
							if (bits) bits.length = value < 1 ? 1 : value
						})
					}}
					min={1}
					placeholder="Length"
				/>
			</td>

			{/* Color */}
			<td>
				<div
					className={"color " + (bitsOrganization.highlight !== "off" ? "highlight" : "")}
					style={{ backgroundColor: bitsOrganization.color }}
					onMouseOver={() => bitsOrganization.highlight !== "focus" && setBitsOrganizations(draft => {
						if (!draft.some(bitsOrganization => bitsOrganization.highlight === "focus")) getElementFromDraftArray(draft, bitsOrganization)!.highlight = "hover"
					})}
					onMouseLeave={() => bitsOrganization.highlight !== "focus" && setBitsOrganizations(draft => {
						getElementFromDraftArray(draft, bitsOrganization)!.highlight = "off"
					})}
					onClick={() => {
						setBitsOrganizations(draft => {
							if (!draft.some(bitsOrganization => bitsOrganization.highlight === "focus") || bitsOrganization.highlight === "focus") {
								const bits = getElementFromDraftArray(draft, bitsOrganization)!
								bits.highlight = bits.highlight === "focus" ? "hover" : "focus"
							}
						})
					}}
				></div>
			</td>
		</tr>
	)
})

export default OrganizationTableEntry