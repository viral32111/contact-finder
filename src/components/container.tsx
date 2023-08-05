import { useEffect, useState } from "react"
import { Contact } from "./contact"
import { fetchRandomUsers } from "../randomUser"
import { OrderBy } from "../orderBy"

// The container holds the contacts.

interface ContainerAttributes {
	contacts: Contact[]
	setContacts: ( contacts: Contact[] ) => void
	orderBy: OrderBy
	setIsFavourited: ( index: number, state: boolean ) => void
}

export const Container: React.FC<ContainerAttributes> = ( { contacts, setContacts, orderBy, setIsFavourited } ) => {
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

	contacts.sort( ( a, b ) => {
		switch ( orderBy ) {
			case OrderBy.name: return a.fullName.localeCompare( b.fullName )
			case OrderBy.mobileNumber: return parseInt( a.mobileNumber ) - parseInt( b.mobileNumber )
			default: return 0
		}
	} )

	return <div className="py-10 px-16 space-y-5">
		{ contacts.map( ( contact, index ) => (
			<Contact key={ index } data={ contact } onFavouriteChange={ ( isChecked ) => setIsFavourited( index, isChecked ) } />
		) ) }

		{ isLoading && <p>Fetching contacts, please wait...</p> }
	</div>
}
