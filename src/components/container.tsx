import { useCallback, useEffect, useRef, useState } from "react"

import { fetchRandomUsers } from "../randomUsers"
import { ContactInfo } from "../structures/contact"
import { OrderBy } from "../structures/orderBy"

import { Contact } from "./contact"

/**
 * Attributes for the container component.
 * Includes passed down state for contacts, ordering & favouriting.
 */
interface ContainerAttributes {
	contacts: ContactInfo[]
	setContacts: ( contacts: ContactInfo[] ) => void
	orderBy: OrderBy
	setIsFavourited: ( identifier: string, state: boolean ) => void
}

/**
 * Component for containing all the contacts.
 * Doesn't have any of its own UI, just acts as a parent for the contact components.
 */
export const Container: React.FC<ContainerAttributes> = ( { contacts, setContacts, orderBy, setIsFavourited } ) => {

	// Number of contacts to load at a time.
	const lazyLoadIncrementCount = 20

	// State for initial loading while fetching contacts & future lazy loading contacts.
	const [ isLoading, setIsLoading ] = useState( true )

	// Sorts the contacts (in a new array) based on the selected ordering.
	// Name is alphabetical (A to Z) while mobile number is numerical (0 to 9).
	const [ sortedContacts, setSortedContacts ] = useState<ContactInfo[]>( [] )
	const sortContacts = ( contacts: ContactInfo[] ) => [ ...contacts ].sort( ( a, b ) => {
		switch ( orderBy ) {
			case OrderBy.name: return a.fullName.localeCompare( b.fullName )
			case OrderBy.mobileNumber: return parseInt( a.mobileNumber ) - parseInt( b.mobileNumber ) // Numbers are stored as strings to preserve leading zeros, so conversion is required.
			default: return 0 // New options may be added in the future that we haven't accounted for, so we'll just return 0 (retain original ordering) to be safe.
		}
	} )

	// Updates state to load more contacts, ideally when the user scrolls to the bottom of the page.
	const [ visibleContactsCount, setVisibleContactsCount ] = useState( Math.min( lazyLoadIncrementCount, contacts.length ) )
	const lazyLoadMoreContacts = useCallback( ( entries: IntersectionObserverEntry[] ) => {
		if ( entries[ 0 ].isIntersecting ) {
			setVisibleContactsCount( ( previousCount ) => Math.min( previousCount + lazyLoadIncrementCount, contacts.length ) )
		}
	}, [ contacts ] )

	// Reference for the lazy loader element, so we can observe it.
	const lazyLoaderReference = useRef( null )

	// Fetches random users from the API to use as contacts, after the component is rendered.
	// Cant use async/await with try/catch here for promise, so use then/catch/finally instead.
	useEffect( () => {
		fetchRandomUsers( 250 ).then( users => {
			setContacts( users.map( user => ( {
				identifier: user.id.value,
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

	// Sort the contacts after they are initially fetched & when the ordering is changed.
	useEffect( () => {
		setSortedContacts( sortContacts( contacts ) )
	}, [ contacts, orderBy ] )

	// Use an intersection observer to detect when the user has scrolled to the bottom of the page.
	useEffect( () => {
		const observer = new IntersectionObserver( lazyLoadMoreContacts, {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		} )

		if ( lazyLoaderReference.current ) observer.observe( lazyLoaderReference.current )

		return () => observer.disconnect()
	}, [ lazyLoadMoreContacts ] )

	// Render the visible contacts, passing the contact information & a callback to update the favourited state.
	return <div className="py-10 px-16 space-y-5">
		{ sortedContacts.slice( 0, visibleContactsCount ).map( ( contact, index ) => (
			<Contact key={ index } data={ contact } onFavouriteChange={ ( isChecked ) => setIsFavourited( contact.identifier, isChecked ) } />
		) ) }

		{ isLoading && <p>Fetching contacts, please wait...</p> }
		{ !isLoading && visibleContactsCount < contacts.length && <div ref={ lazyLoaderReference }>Loading more contacts, please wait...</div> }
	</div>

}
