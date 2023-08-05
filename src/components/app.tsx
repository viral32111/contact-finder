import { Header } from "./header"
import { Filter } from "./filter"
import { Container } from "./container"
import { useState } from "react"
import { Contact } from "./contact"

// Main component that renders the rest of the application.

export const App = () => {
	const [ contacts, setContacts ] = useState<Contact[]>( [] )

	const setIsFavourited = ( index: number, state: boolean ) => {
		const newContacts = [ ...contacts ]
		newContacts[ index ].isFavourited = state
		setContacts( newContacts )
	}

	return <>
		<Header />

		<Filter contacts={ contacts }/>
		<Container contacts={ contacts } setContacts={ setContacts } setIsFavourited={ setIsFavourited } />
	</>
}
