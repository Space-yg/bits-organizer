import React, { useEffect, useState } from "react"
import { useImmer } from "use-immer"
import { BitsTable } from "./features/bits-table"
import { OrganizationTable } from "./features/organization-table"
import { DataInput } from "./features/data-input"
import { InfoDisplay } from "./features/info"
import { defaultOrganizationTableEntry } from "./utils/helpers"
import { Footer } from "@/components/layout"
import type { BitsOrganization } from "./types"

import "./Home.scss"

type Props = {}

export default function Home({ }: Props) {
	const [bitsOrganizations, setBitsOrganizations] = useImmer<BitsOrganization[]>([defaultOrganizationTableEntry(0, [])])
	const [data, setData] = useState<number[]>([])

	useEffect(() => {
		// Adds .home to body
		document.body.classList.add("home")
	}, [])

	return (
		<>
			<h1>Bits Organizer</h1>

			<OrganizationTable bitsOrganizations={bitsOrganizations} setBitsOrganizations={setBitsOrganizations} />

			<DataInput setData={setData} />

			<BitsTable bitsOrganizations={bitsOrganizations} setBitsOrganizations={setBitsOrganizations} data={data} />

			<InfoDisplay bitsOrganizations={bitsOrganizations} data={data} />

			<Footer />
		</>
	)
}