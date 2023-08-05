// The filter should contain the total number of contacts, and an order by drop-down.

import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export interface Contact {
	fullName: string
	mobileNumber: string
	landlineNumber: string
	emailAddress: string
	homeAddress: {
		houseNumber: number
		streetName: string,
		cityName: string,
		countryName: string,
		postCode: string,
	}
	pictureUrl: string
	isFavourited: boolean
}

interface ContactAttributes {
	data: Contact
	onFavouriteChange: ( state: boolean ) => void
}

export const Contact: React.FC<ContactAttributes> = ( { data, onFavouriteChange } ) => {
	const [ isCollapsed, setIsCollapsed ] = useState( true )

	return <div className="p-5 relative shadow-md bg-white text-gray-600">
		<div className="flex items-center">
			<img className="w-16 h-16 rounded-full mr-4" src={ data.pictureUrl } alt={ data.fullName } />

			<div>
				<h2 className="text-xl text-slate-700">{ data.fullName }</h2>
				<p className="text-sm text-slate-400">{ data.mobileNumber }</p>
			</div>

			<button
				className="ml-auto transform transition-transform"
				style={{ transform: isCollapsed ? "rotate( 0deg )" : "rotate( 180deg )" }}
				onClick={ () => setIsCollapsed( !isCollapsed ) }>

				<FontAwesomeIcon icon={ faChevronDown } size="2xl" />
			</button>
		</div>

		{ !isCollapsed && (
			<div className="mt-4 text-sm">
				<hr className="mb-4" />

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
					<input name="addToFavourites" id="addToFavourites" className="w-5 h-5" type="checkbox" checked={ data.isFavourited } onChange={ ( e ) => { onFavouriteChange( e.target.checked ) } } />
				</div>
			</div>
		) }
	</div>
}
