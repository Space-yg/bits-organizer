import React from "react"

type Props = {
	bit: number
}

export default function UnorganizedBitsGroup({ bit }: Props) {
	return (
		<div>
			<div>{bit}</div>
		</div>
	)
}