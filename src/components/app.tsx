import { Header } from "./header"
import { Filter } from "./filter"
import { Container } from "./container"
import { User } from "../randomUser"
import { useState } from "react"

// Main component that renders the rest of the application.

export const App = () => {
	const [ contacts, setContacts ] = useState<User[]>( [] )

	return <>
		<Header />

		<Filter contacts={ contacts }/>
		<Container contacts={ contacts } setContacts={ setContacts } />
	</>
}
