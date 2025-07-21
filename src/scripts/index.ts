import { checkErrors } from "./errors.js"
import { organizationTable, bitsTbody } from "./globals.js"

/** The bytes data text area */
const bytesDataTextArea = document.getElementById("bytes-data") as HTMLTextAreaElement
/** Convert button */
const organizeButton = document.getElementById("organize-button") as HTMLButtonElement
/** Highlights all the bits table */
const highlightAllButton = document.getElementById("highlight-all") as HTMLButtonElement
/** Information about a set of bits */
const infoDiv = document.getElementById("info") as HTMLDivElement

/** All available colors */
const colors = [
	"navy",
	"lime",

	"maroon",
	"blue",

	"teal",
	"yellow",

	"purple",
	"aqua",

	"green",
	"red",

	"olive",
	"fuchsia",
] as const

/**
 * Removes all the highlighting in the bits table
 */
function removeHighlightingInBitsTable(): void {
	for (const tr of bitsTbody.rows) {
		for (const td of tr.cells) {
			td.style.backgroundColor = ""
		}
	}
}

/**
 * Highlight a set of bits in the bits table
 * @param startBit The start position of the highlight
 * @param length The length of the highlight
 * @param color The color to use to highlight
 */
function highlightInBitsTable(startBit: number, length: number, color: string) {
	// Add highlighting
	getBitsTds(startBit, length).forEach(td => {
		td.style.backgroundColor = color
	})
}
highlightAllButton.addEventListener("click", () => {
	// Remove any current highlighting
	removeHighlightingInBitsTable()

	// Check for errors
	checkErrors()

	for (let i = 0; i < organizationTable.tBodies[0].rows.length; i++) {
		const tr = organizationTable.tBodies[0].rows[i]
		const bitsInput = tr.cells[3].firstElementChild as HTMLInputElement
		const lengthInput = tr.cells[4].firstElementChild as HTMLInputElement
		const highlightTd = tr.cells[6]
		highlightTd.style.backgroundColor = colors[i % colors.length]
		highlightInBitsTable(+bitsInput.value, +lengthInput.value, colors[i % colors.length])
	}
})

/**
 * Find the index of a table row in a table section
 * @param tableSection The table section to search in
 * @param tableRow The table row to find
 * @returns The index of the table row, or `-1` if not found
 */
function indexOfTableRowInTableSection(tableSection: HTMLTableSectionElement, tableRow: HTMLTableRowElement): number {
	for (let i = 0; i < tableSection.rows.length; i++) {
		if (tableSection.rows[i] == tableRow) return i
	}
	return -1
}

/**
 * Gets the table data for a set of bits
 * @param startBit The start bit
 * @param length The length of the data
 * @returns The table data representing this set of data
 */
function getBitsTds(startBit: number, length: number): HTMLTableCellElement[] {
	const bits: HTMLTableCellElement[] = []

	const startRow = Math.floor(startBit / 8) * 8
	let tr, td
	let startCol = startBit - startRow
	for (let i = startRow; i < startBit + length; i += 8) {
		tr = bitsTbody.rows[i / 8]
		for (let j = startCol; j < 8 && i + j < startBit + length; j++) {
			td = tr.cells[j]
			bits.push(td)
		}
		startCol = 0
	}

	return bits
}

function showInfo(startBit: number, length: number) {
	// Reset info
	infoDiv.innerHTML = ""

	// Get bits
	const bits: number[] = getBitsTds(startBit, length).map(td => +td.innerText)
	const decimal: number = parseInt(bits.map(bit => bit + "").reduce((pre, cur) => pre + cur, ""), 2)

	// Create info
	const infos: string[] = []
	if (bits.length > 0) {
		infos.push(`Binary: ${decimal.toString(2)}`)
		infos.push(`Octal: ${decimal.toString(8)}`)
		infos.push(`Decimal: ${decimal}`)
		infos.push(`Hex: ${decimal.toString(16)}`)
		infos.push(`ASCII: ${String.fromCharCode(decimal)}`)
	}

	// Add info
	for (const info of infos) {
		const p = document.createElement("p")
		p.innerHTML = info
		infoDiv.appendChild(p)
	}
}

/**
 * Creates a table row for the organization table
 * ```html
 * <tr>
 * 	<td><button onclick>x</button></td>
 * 	<td>
 * 		<button onclick>Add above</button>
 * 		<button onclick>Add below</button>
 * 	</td>
 * 	<td><input type="text"></td>
 * 	<td><input type="number"></td>
 * 	<td><input type="number"></td>
 * 	<td><button onclick>Info</button></td>
 * 	<td></td>
 * </tr>
 * ```
 * @returns The table row
 */
function createOrganizationTableRow(): HTMLTableRowElement {
	// <tr>
	const tr = document.createElement("tr")

	//// Remove
	// 	<td>
	const removeTd = document.createElement("td")
	// 		<button>x</button>
	const removeButton = document.createElement("button")
	removeButton.type = "button"
	removeButton.innerText = "x"
	removeButton.addEventListener("click", () => tr.remove())
	removeTd.appendChild(removeButton)
	// 	</td>
	tr.appendChild(removeTd)

	//// Add
	// 	<td>
	const addTd = document.createElement("td")
	// 		<button>Add above</button>
	const addAboveButton = document.createElement("button")
	addAboveButton.innerText = "Add above"
	addAboveButton.type = "button"
	addAboveButton.addEventListener("click", () => tr.insertAdjacentElement("beforebegin", createOrganizationTableRow()))
	addTd.appendChild(addAboveButton)
	// 		<button>Add below</button>
	const addBelowButton = document.createElement("button")
	addBelowButton.innerText = "Add below"
	addBelowButton.type = "button"
	addBelowButton.addEventListener("click", () => tr.insertAdjacentElement("afterend", createOrganizationTableRow()))
	addTd.appendChild(addBelowButton)
	// 	</td>
	tr.appendChild(addTd)

	//// Name
	// 	<td>
	const nameTd = document.createElement("td")
	// 		<input type="text">
	const nameInput = document.createElement("input")
	nameInput.type = "text"
	nameInput.placeholder = "Name"
	nameTd.appendChild(nameInput)
	// 	</td>
	tr.appendChild(nameTd)

	//// Bits
	// 	<td>
	const startBitTd = document.createElement("td")
	// 		<input type="number">
	const startBitInput = document.createElement("input")
	startBitInput.type = "number"
	startBitInput.placeholder = "Start bit"
	startBitTd.appendChild(startBitInput)
	// 	</td>
	tr.appendChild(startBitTd)

	//// Length
	// 	<td>
	const lengthTd = document.createElement("td")
	// 		<input type="number">
	const lengthInput = document.createElement("input")
	lengthInput.type = "number"
	lengthInput.placeholder = "Length"
	lengthTd.appendChild(lengthInput)
	// 	</td>
	tr.appendChild(lengthTd)

	//// Info
	// 	<td>
	const infoTd = document.createElement("td")
	// 		<button>Info</button>
	const infoButton = document.createElement("button")
	infoButton.type = "button"
	infoButton.innerText = "Info"
	infoButton.addEventListener("click", () => showInfo(+startBitInput.value, +lengthInput.value))
	infoTd.appendChild(infoButton)
	// 	</td>
	tr.appendChild(infoTd)

	//// Highlight
	// 	<td>
	const highlightTd = document.createElement("td")
	// 	</td>
	tr.appendChild(highlightTd)

	// </tr>
	return tr
}
organizationTable.tBodies[0].appendChild(createOrganizationTableRow())

/** Adds an organization table data to the end of the table */
const addOrganizationTableDataButton = document.getElementById("add-organization-table-data") as HTMLButtonElement
addOrganizationTableDataButton.addEventListener("click", () => organizationTable.tBodies[0].appendChild(createOrganizationTableRow()))

/**
 * Resets the bits table body
 */
function resetBitsTbody(): void {
	bitsTbody.innerHTML = ""
}

/**
 * Converts bytes to bits
 * @param bytes The bytes to convert
 * @returns The bits
 */
function bytesToBits(bytes: number[]): number[] {
	const bits: number[] = []
	for (const byte of bytes) bits.push(...byte.toString(2).padStart(8).split("").map(bit => +bit))
	return bits
}

/**
 * Add the bits to the bits table
 * @param bits The bits to add to the table
 */
function addBitsToBitsTable(bits: number[]): void {
	let tr, td
	for (let i = 0; i < bits.length; i += 8) {
		tr = document.createElement("tr")
		for (let j = 0; j < 8 && i + j < bits.length; j++) {
			td = document.createElement("td")
			td.innerText = bits[i + j] + ""
			tr.appendChild(td)
		}
		bitsTbody.appendChild(tr)
	}
}

// Organize the bits
organizeButton.addEventListener("click", () => {
	// Reset the bits table
	resetBitsTbody()

	// Convert the bytes to bits
	const bytes = bytesDataTextArea.value.split(" ").map(byte => parseInt(byte.slice(2), 16))
	const bits = bytesToBits(bytes)

	// Add bits to table
	addBitsToBitsTable(bits)
})