import { useEffect, useState } from "react"
import { Contact } from "./contact"
import { fetchRandomUsers } from "../randomUser"

// The container holds the contacts.

interface ContainerAttributes {
	contacts: Contact[]
	setContacts: ( contacts: Contact[] ) => void,
	setIsFavourited: ( index: number, state: boolean ) => void
}

export const Container: React.FC<ContainerAttributes> = ( { contacts, setContacts, setIsFavourited } ) => {
	const [ isLoading, setIsLoading ] = useState( true )

	useEffect( () => {
		fetchRandomUsers( 10 ).then( users => {
			const contacts: Contact[] = users.map( user => ( {
				fullName: `${ user.name.first } ${ user.name.last }`,
				mobileNumber: user.cell,
				landlineNumber: user.phone,
				emailAddress: user.email,
				homeAddress: {
					houseNumber: user.location.street.number,
					streetName: user.location.street.name,
					cityName: user.location.city,
					countryName: user.location.country,
					postCode: user.location.postcode
				},
				pictureUrl: user.picture.large,
				isFavourited: false
			} ) )

			setContacts( contacts )
		} ).catch( error => {
			alert( "Failed to fetch random users!" )
			console.error( "Failed to fetch random users! (%s)", error )
		} ).finally( () => {
			setIsLoading( false )
		} )
	}, [ setContacts ] )

	return <div className="py-10 px-16 space-y-5">
		{ contacts.map( ( contact, index ) => (
			<Contact key={ index } data={ contact } onFavouriteChange={ ( isChecked ) => setIsFavourited( index, isChecked ) } />
		) ) }

		{ isLoading && <p>Loading...</p> }
	</div>
}
