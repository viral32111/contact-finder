import { useEffect, useState } from "react"
import { Contact } from "./contact"
import { User, fetchRandomUsers } from "../randomUser"

// The container holds the contacts.

interface ContainerAttributes {
	contacts: User[]
	setContacts: ( contacts: User[] ) => void
}

export const Container: React.FC<ContainerAttributes> = ( { contacts, setContacts } ) => {
	const [ isLoading, setIsLoading ] = useState( true )

	useEffect( () => {
		fetchRandomUsers( 10 ).then( users => {
			setContacts( users )
		} ).catch( error => {
			alert( "Failed to fetch random users!" )
			console.error( "Failed to fetch random users! (%s)", error )
		} ).finally( () => {
			setIsLoading( false )
		} )
	}, [] )

	return <div className="py-10 px-16 space-y-5">
		{ contacts.map( ( contact, index ) => (
			<Contact
				key={ index }
				fullName={ contact.name.first + " " + contact.name.last }
				mobileNumber={ contact.cell }
				landlineNumber={ contact.phone }
				emailAddress={ contact.email }
				location={ contact.location }
				pictureUrl={ contact.picture.large } />
		) ) }

		{ isLoading && <p>Loading...</p> }
	</div>
}
