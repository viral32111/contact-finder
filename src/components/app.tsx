import { useState } from "react"

import { OrderBy } from "../structures/orderBy"
import { ContactInfo } from "../structures/contact"

import { Header } from "./header"
import { Filter } from "./filter"
import { Container } from "./container"

/**
 * Main component that renders the rest of the application.
 */
export const App = () => {

	// State for the contacts and ordering.
	const [ contacts, setContacts ] = useState<ContactInfo[]>( [] )
	const [ orderBy, setOrderBy ] = useState<OrderBy>( OrderBy.name )

	// Helper for updating the favourited "state" of a contact.
	const setIsFavourited = ( identifier: string, state: boolean ) => {
		const newContacts = [ ...contacts ]

		const contact = newContacts.find( contact => contact.identifier === identifier )
		if ( !contact ) throw new Error( `Contact with identifier '${ identifier }' not found.` )

		contact.isFavourited = state

		setContacts( newContacts )
	}

	// Render all the other components.
	return <>
		<Header />
		<Filter contacts={ contacts } orderBy={ orderBy } setOrderBy={ setOrderBy } />
		<Container contacts={ contacts } setContacts={ setContacts } orderBy={ orderBy } setIsFavourited={ setIsFavourited } />
	</>

}
