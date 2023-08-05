import { useEffect, useState } from "react"
import { Contact } from "./contact"
import { User, fetchRandomUsers } from "../randomUser"

// The container holds the contacts.

export const Container = () => {
	const [ users, setUsers ] = useState<User[]>( [] )
	const [ isLoading, setIsLoading ] = useState( true )

	useEffect( () => {
		fetchRandomUsers( 10 ).then( users => {
			setUsers( users )
		} ).catch( error => {
			alert( "Failed to fetch random users!" )
			console.error( "Failed to fetch random users! (%s)", error )
		} ).finally( () => {
			setIsLoading( false )
		} )
	}, [] )

	return <div className="py-10 px-16 space-y-5">
		{ users.map( ( user, index ) => (
			<Contact
				key={ index }
				fullName={ user.name.first + " " + user.name.last }
				mobileNumber={ user.cell }
				landlineNumber={ user.phone }
				emailAddress={ user.email }
				location={ user.location }
				pictureUrl={ user.picture.large } />
		) ) }

		{ isLoading && <p>Loading...</p> }
	</div>
}
