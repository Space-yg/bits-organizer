import React, { useCallback } from "react"

import "./styles.scss"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	min?: number | undefined
	max?: number | undefined
}

/** A number input */
export default function InputNumber(props: Props) {
	const handleOnBlur = useCallback((event: React.FocusEvent<HTMLInputElement, Element>) => {
		const value = +event.currentTarget.value

		// Check if input is empty
		if (event.currentTarget.value === "") event.currentTarget.value = Math.min(Math.max(0, props.min ?? 0), props.max ?? 0) + ""

		// Check if value can be parsed to be a number
		if (isNaN(value)) event.currentTarget.value = Math.min(Math.max(0, props.min ?? 0), props.max ?? 0) + ""

		// Check if value is less than the minimum
		if (props.min && value < props.min) event.currentTarget.value = props.min + ""

		// Check if value is greater than the maximum
		if (props.max && value > props.max) event.currentTarget.value = props.max + ""

		// Execute on blur if it exists
		if (props.onBlur) props.onBlur(event)
	}, [])

	return (
		<input
			{...props}
			type="number"
			inputMode="numeric"
			onBlur={handleOnBlur}
		/>
	)
}