import { useState } from "react"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ContactInfo } from "../structures/contact"

/**
 * Attributes for the contact component.
 * Includes the contact information itself & a callback for when the favourite check-box changes.
 */
interface ContactAttributes {
	data: ContactInfo
	onFavouriteChange: ( state: boolean ) => void
}

/**
 * Component for displaying a single contact.
 * Should contain all the information for a contact & including a check-box for favouriting, in a collapsable box.
*/
export const Contact: React.FC<ContactAttributes> = ( { data, onFavouriteChange } ) => {

	// State for collapsing the box.
	const [ isCollapsed, setIsCollapsed ] = useState( true )

	// Render the contact information within a collapsable box.
	return <div className="p-5 relative shadow-md bg-white text-gray-600">
		<div className="flex items-center">
			<img className="w-16 h-16 rounded-full mr-4" src={ data.pictureUrl } alt={ data.fullName } />

			<div>
				<h2 className="text-xl text-slate-700">{ data.fullName }</h2>
				<p className="text-sm text-slate-400">{ data.mobileNumber }</p>
			</div>

			<button
				className="ml-auto transform transition-transform"
				style={ { transform: isCollapsed ? "rotate( 0deg )" : "rotate( 180deg )" } }
				onClick={ () => setIsCollapsed( !isCollapsed ) }>

				<FontAwesomeIcon icon={ faChevronDown } size="2xl" />
			</button>
		</div>

		<div className={ "text-sm transition-all duration-300 " + ( isCollapsed ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-96 overflow-visible mt-5" ) }>
			<hr className="mb-3" />

			<div className="grid grid-cols-2 p-2">
				<div>
					<p className="font-bold">Address:</p>
					<p>
						{ data.homeAddress.houseNumber } { data.homeAddress.streetName },<br />
						{ data.homeAddress.cityName },<br />
						{ data.homeAddress.countryName },<br />
						{ data.homeAddress.postCode }
					</p>
				</div>

				<div>
					<p className="font-bold">Landline: <span>{ data.landlineNumber }</span></p>
					<p className="font-bold">Email: <span>{ data.emailAddress }</span></p>
				</div>
			</div>

			<div className="flex justify-end items-center">
				<label htmlFor="addToFavourites" className="mr-2 font-bold text-gray-400">Add to Favourites</label>
				<input
					name="addToFavourites"
					className="w-5 h-5"
					type="checkbox"
					checked={ data.isFavourited }
					onChange={ ( e ) => { onFavouriteChange( e.target.checked ) } } />
			</div>
		</div>
	</div>
}
