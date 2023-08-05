import { useState } from "react"

import { Header } from "./header"
import { Filter } from "./filter"
import { Container } from "./container"
import { Contact } from "./contact"
import { OrderBy } from "../orderBy"

// Main component that renders the rest of the application.

export const App = () => {
	const [ contacts, setContacts ] = useState<Contact[]>( [] )
	const [ orderBy, setOrderBy ] = useState<OrderBy>( OrderBy.name )

	const setIsFavourited = ( index: number, state: boolean ) => {
		const newContacts = [ ...contacts ]
		newContacts[ index ].isFavourited = state
		setContacts( newContacts )
	}

	return <>
		<Header />

		<Filter contacts={ contacts } orderBy={ orderBy } setOrderBy={ setOrderBy } />
		<Container contacts={ contacts } setContacts={ setContacts } orderBy={ orderBy } setIsFavourited={ setIsFavourited } />
	</>
}
