import React, { memo, useState } from "react"

import "./styles.scss"

/** The allowed delimiters */
type Delimiter = "space" | "comma"

/** The allowed formats */
type Format = "binary" | "octal" | "hex"

type Props = {
	setData: React.Dispatch<React.SetStateAction<number[]>>
}

/**
 * Convert a number to an ordinal
 * @param num The number to convert
 * @returns The ordinal of the number
 */
function numberToOrdinal(num: number): string {
	let ordinal: string = num.toString()
	if (ordinal.slice(-1) === "1") ordinal += "st"
	else if (ordinal.slice(-1) === "2") ordinal += "nd"
	else if (ordinal.slice(-1) === "3") ordinal += "rd"
	else ordinal += "th"
	return ordinal
}

/**
 * Converts the input data to an array of bits
 * @param inputData The input data to convert
 * @returns The array of bits
 */
function inputDataToData(inputData: string, format: Format, delimiter: Delimiter): number[] {
	const delimiterChar = delimiter === "space" ? " " : delimiter === "comma" ? "," : undefined
	if (typeof delimiterChar === "undefined") throw new Error(`Delimiter cannot be "${delimiter}"`)

	// Split the input data
	const splitInputData = inputData.split(delimiterChar).map(inputDatum => inputDatum.trim()) // Clean the data

	// Loop over the data
	const data: number[] = []
	splitInputData.forEach(inputDatum => {
		//// Return if there is nothing
		if (inputDatum === "") return

		let tempInputDatum = inputDatum
		let value: number
		let invalidCharIndex: number
		switch (format) {
			case "binary":
				// Remove prefix if it exists
				if (tempInputDatum.startsWith("0b")) tempInputDatum = tempInputDatum.slice(2)

				// Get the position of invalid characters
				invalidCharIndex = tempInputDatum.search(/[^01]/i)

				// Try to parse input
				value = parseInt(tempInputDatum, 2)
				break
			case "octal":
				// Remove prefix if it exists
				if (tempInputDatum.startsWith("0o")) tempInputDatum = tempInputDatum.slice(2)

				// Get the position of invalid characters
				invalidCharIndex = tempInputDatum.search(/[^01234567]/i)

				// Try to parse input
				value = parseInt(tempInputDatum, 8)
				break
			case "hex":
				// Remove prefix if it exists
				if (tempInputDatum.startsWith("0x")) tempInputDatum = tempInputDatum.slice(2)

				// Get the position of invalid characters
				invalidCharIndex = tempInputDatum.search(/[^0123456789abcdef]/i)

				// Try to parse input
				value = parseInt(tempInputDatum, 16)
				break
			default:
				// Unknown format
				throw new Error(`Unknown format "${format}"`)
		}
		// Check if the character are valid
		if (invalidCharIndex !== -1) throw new Error(`Unknown characters in "${inputDatum}" at the ${inputDatum !== tempInputDatum ? numberToOrdinal(invalidCharIndex + 1 + 2) : numberToOrdinal(invalidCharIndex + 1)} character`)

		// If it couldn't parse the input, throw an error
		if (isNaN(value)) throw new Error(`Cannot parse "${inputDatum}"`)

		// Convert value to binary
		data.push(...value
			.toString(2) // Convert number to binary
			.padStart((format === "binary" ? 1 : format === "octal" ? 3 : format === "hex" ? 4 : 0) * tempInputDatum.length, "0") // Pad the binary with 0s
			.split("") // Split the binary at each bit
			.map(bit => +bit) // Convert each bit from string to number
		)
	})

	return data
}

/** The input for the bits or bytes */
const DataInput = memo(function DataInput({ setData }: Props) {
	const [inputData, setInputData] = useState<string>("")
	const [delimiter, setDelimiter] = useState<Delimiter>("space")
	const [format, setFormat] = useState<Format>("hex")
	const [error, setError] = useState<string>("")

	return (
		<>
			<h2>Input Data</h2>

			{/* Format */}
			<label>
				<span>Format: </span>
				<select name="format" value={format} onInput={e => {
					setFormat(e.currentTarget.value as Format)

					try {
						setData(inputDataToData(inputData, e.currentTarget.value as Format, delimiter))
						setError("")
					} catch (err: any) {
						setError(err.message)
					}
				}}>
					<option value="binary">Binary</option>
					<option value="octal">Octal</option>
					<option value="hex">Hexadecimal</option>
				</select>
			</label>

			{/* Delimiter */}
			<label>
				<span>Delimiter: </span>
				<select name="delimiter" value={delimiter} onInput={e => {
					setDelimiter(e.currentTarget.value as Delimiter)

					try {
						setData(inputDataToData(inputData, format, e.currentTarget.value as Delimiter))
						setError("")
					} catch (err: any) {
						setError(err.message)
					}
				}}>
					<option value="space">Space ( )</option>
					<option value="comma">Comma (,)</option>
				</select>
			</label>

			{/* Input */}
			<label>
				<span>Input: </span>
				<textarea
					name="data"
					autoCapitalize="off"
					placeholder={
						format === "binary" ? "1010 0b1001" :
							format === "octal" ? "17 0o32" :
								format === "hex" ? "1a 0x3F" :
									"Unknown format"
					}
					value={inputData}
					onInput={e => {
						setInputData(e.currentTarget.value)

						try {
							setData(inputDataToData(e.currentTarget.value, format, delimiter))
							setError("")
						} catch (err: any) {
							setError(err.message)
						}
					}}
				></textarea>
			</label>

			{/* Errors */}
			{error &&
				<>
					<p className="warning">Error: {error}</p>
				</>
			}
		</>
	)
})

export default DataInput