import React from "react"
import { getElementFromDraftArray } from "!/utils/helpers"
import type { Updater } from "use-immer"
import type { BitsOrganization } from "!/types"

type Props = {
	bitsOrganization: BitsOrganization
	setBitsOrganizations: Updater<BitsOrganization[]>
	data: number[]
}

export default function OrganizedBitsGroup({ bitsOrganization, setBitsOrganizations, data }: Props) {
	return (
		// Group of bits
		<div
			className={bitsOrganization.highlight !== "off" ? "highlight" : ""}
			onMouseOver={() => bitsOrganization.highlight !== "focus" && setBitsOrganizations(draft => {
				if (!draft.some(bitsOrganization => bitsOrganization.highlight === "focus")) getElementFromDraftArray(draft, bitsOrganization)!.highlight = "hover"
			})}
			onMouseLeave={() => bitsOrganization.highlight !== "focus" && setBitsOrganizations(draft => {
				if (getElementFromDraftArray(draft, bitsOrganization)) getElementFromDraftArray(draft, bitsOrganization)!.highlight = "off"
			})}
			onClick={() => {
				setBitsOrganizations(draft => {
					if (!draft.some(bitsOrganization => bitsOrganization.highlight === "focus") || bitsOrganization.highlight === "focus") {
						const bits = getElementFromDraftArray(draft, bitsOrganization)!
						bits.highlight = bits.highlight === "focus" ? "hover" : "focus"
					}
				})
			}}
		>
			{/* Tooltip */}
			{bitsOrganization.name &&
				<span style={{
					left: (
						(
							(
								// Checks if the total bits is (technically) even and is exactly in the middle of the end
								(bitsOrganization.startBit + bitsOrganization.length / 2 + 1) % 8 === 1 ?
									// Make it show in the previous line at the very end
									7.5 :
									// Show normally in the middle
									bitsOrganization.startBit + bitsOrganization.length / 2
							) * 100 / 8
						) % 100 // So that it does not over exceed the right side
					) + "%", // Percentage

					top: (
						(
							// Checks if the total bits is (technically) even and is exactly in the middle of the end
							(bitsOrganization.startBit + bitsOrganization.length / 2 + 1) % 8 === 1 ?
								// Make it show on the previous line
								Math.floor((bitsOrganization.startBit + bitsOrganization.length / 2 - 1) / 8) :
								// Show normally above the line that the middle is at
								Math.floor((bitsOrganization.startBit + bitsOrganization.length / 2) / 8)
						) * 100 / Math.ceil(data.length / 8)
					) + "%" // Percentage
				}}>{bitsOrganization.name}</span>
			}

			{/* Bits */}
			{data.slice(bitsOrganization.startBit, bitsOrganization.startBit + bitsOrganization.length).map((bit, i) => <div key={i} style={{ backgroundColor: bitsOrganization.color }}>{bit}</div>)}
		</div>
	)
}