/** A bit organization */
export type BitsOrganization = {
	/** The ID of the bit organization */
	id: number
	/** The name of the bit organization */
	name: string
	/** The start bit of the set of bits */
	startBit: number
	/** The length of the set of bits */
	length: number
	/** The color of the set of bits */
	color: string
	/** Whether to highligh the set of bits */
	highlight: "off" | "hover" | "focus"
}