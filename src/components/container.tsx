import { useEffect, useState } from "react"

import { fetchRandomUsers } from "../randomUser"
import { ContactInfo } from "../contact"

import { Contact } from "./contact"
import { OrderBy } from "../orderBy"

/**
 * Attributes for the container component.
 * Includes passed down state for contacts, ordering & favouriting.
 */
interface ContainerAttributes {
	contacts: ContactInfo[]
	setContacts: ( contacts: ContactInfo[] ) => void

	orderBy: OrderBy

	setIsFavourited: ( index: number, state: boolean ) => void
}

/**
 * Component for containing all the contacts.
 * Doesn't have any of its own UI, just acts as a parent for the contact components.
 */
export const Container: React.FC<ContainerAttributes> = ( { contacts, setContacts, orderBy, setIsFavourited } ) => {

	// State for displaying a loading message while the contacts are being fetched.
	const [ isLoading, setIsLoading ] = useState( true )

	// Fetches random users from the API to use as contacts, after the component is rendered.
	useEffect( () => {
		fetchRandomUsers( 250 ).then( users => {
			setContacts( users.map( user => ( {
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
			} ) ) )

		} ).catch( error => {
			alert( "Unable to fetch contacts! See the console for more details." ) // Not ideal, but it works for demo.
			console.error( "Failed to fetch random users! (%s)", error )

		} ).finally( () => {
			setIsLoading( false )
		} )
	}, [ setContacts ] )

	// Sort the contacts based on the selected ordering.
	// Name is alphabetical (A to Z) while mobile number is numerical (0 to 9).
	contacts.sort( ( a, b ) => {
		switch ( orderBy ) {
			case OrderBy.name: return a.fullName.localeCompare( b.fullName )
			case OrderBy.mobileNumber: return parseInt( a.mobileNumber ) - parseInt( b.mobileNumber ) // Numbers are stored as strings to preserve leading zeros, so conversion is required.
			default: return 0 // New options may be added in the future that we haven't accounted for, so we'll just return 0 (retain original ordering) to be safe.
		}
	} )

	// Render each contact, passing the contact information and a callback to update the favourited state.
	return <div className="py-10 px-16 space-y-5">
		{ contacts.map( ( contact, index ) => (
			<Contact key={ index } data={ contact } onFavouriteChange={ ( isChecked ) => setIsFavourited( index, isChecked ) } />
		) ) }

		{ isLoading && <p>Fetching contacts, please wait...</p> }
	</div>

}
