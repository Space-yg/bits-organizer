import { original } from "immer"
import type { Draft, WritableDraft } from "immer"
import type { BitsOrganization } from "!/types"

/**
 * Gets a pseudorandom light color
 * @returns A pseudorandom light color
 */
function getLightColor(): string {
	return "#" + (Math.round(Math.random() * 128) + 127).toString(16) + (Math.round(Math.random() * 128) + 127).toString(16) + (Math.round(Math.random() * 128) + 127).toString(16)
}

/**
 * Get a the default organization table entry
 * @returns The default organization table entry
 */
export function defaultOrganizationTableEntry(id: number, bitsOrganizations: BitsOrganization[]): BitsOrganization {
	return {
		id,
		name: "",
		startBit: bitsOrganizations.length === 0 ? 0 : Math.max(...bitsOrganizations.map(bitsOrganization => bitsOrganization.startBit + bitsOrganization.length)),
		length: 1,
		color: getLightColor(),
		highlight: "off",
	}
}

/**
 * Get an element from a draft array
 * @param draft The draft to get the element from
 * @param element The element to get
 * @returns The element
 */
export function getElementFromDraftArray<T extends Record<any, any>>(draft: WritableDraft<T>[], element: T): WritableDraft<T> | undefined {
	const org = original(draft)
	if (typeof org === "undefined") return undefined
	return draft[org.indexOf(element)]
}