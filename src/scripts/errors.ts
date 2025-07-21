import { organizationTable, bitsTbody } from "./globals.js"

/** A list of errors */
const errorsList = document.getElementById("errors") as HTMLUListElement

/**
 * Checks for errors in the organization table
 * @returns The error messages if there are any
 */
function checkOverlapsInOrganizationTable(): string[] {
	const errors: string[] = []

	let lastBitInPre: number = -1
	let nameInPre: string = ""
	for (const tr of organizationTable.tBodies[0].rows) {
		const nameInput = tr.cells[2].firstElementChild as HTMLInputElement
		const startBitInput = tr.cells[3].firstElementChild as HTMLInputElement
		if (lastBitInPre >= +startBitInput.value) {
			errors.push(`"${nameInPre}" is overlapping with "${nameInput.value}".`)
		}
		const lengthInput = tr.cells[4].firstElementChild as HTMLInputElement
		lastBitInPre = +startBitInput.value + +lengthInput.value - 1
		nameInPre = nameInput.value
	}

	return errors
}

/**
 * Check if there are enough bits to highlight
 * @returns The error messages if there are any
 */
function checkForEnoughBits(): string[] {
	const errors: string[] = []

	for (const tr of organizationTable.tBodies[0].rows) {
		const lastBit: number = +(tr.cells[3].firstElementChild as HTMLInputElement).value + +(tr.cells[4].firstElementChild as HTMLInputElement).value
		if (lastBit > bitsTbody.rows.length * 8) {
			const nameInput = tr.cells[2].firstElementChild as HTMLInputElement
			errors.push(`There are not enough bits for "${nameInput.value}".`)
		}
	}

	return errors
}

/**
 * Check if the start bit is valid
 * @returns The error messages if there are any
 */
function checkValidStartBit(): string[] {
	const errors: string[] = []

	for (const tr of organizationTable.tBodies[0].rows) {
		if (+(tr.cells[3].firstElementChild as HTMLInputElement).value < 0) {
			const nameInput = tr.cells[2].firstElementChild as HTMLInputElement
			errors.push(`"${nameInput.value}"'s start bit cannot be less than 0.`)
		}
	}

	return errors
}

/**
 * Checks for errors
 */
export function checkErrors(): void {
	// Reset errors
	errorsList.innerHTML = ""

	// Combine all errors
	const errors: string[] = [
		...checkValidStartBit(),
		...checkOverlapsInOrganizationTable(),
		...checkForEnoughBits(),
	]

	// Add errors to list
	let li: HTMLLIElement
	for (const error of errors) {
		li = document.createElement("li")
		li.innerText = error
		errorsList.appendChild(li)
	}

	// If there are no errors
	if (errors.length === 0) {
		li = document.createElement("li")
		li.innerText = "No errors found!"
		errorsList.appendChild(li)
	}
}