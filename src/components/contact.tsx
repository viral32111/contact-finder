// The filter should contain the total number of contacts, and an order by drop-down.

import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Location } from "../randomUser"

interface ContactAttributes {
	fullName: string
	mobileNumber: string
	landlineNumber: string
	emailAddress: string
	location: Location
	pictureUrl: string
}

export const Contact: React.FC<ContactAttributes> = ( {
	fullName,
	mobileNumber,
	landlineNumber,
	emailAddress,
	location,
	pictureUrl
} ) => {
	const [ isCollapsed, setIsCollapsed ] = useState( true )
	const [ isFavourited, setIsFavorited ] = useState( false )

	return <div className="p-5 relative shadow-md bg-white text-gray-600">
		<div className="flex items-center">
			<img className="w-16 h-16 rounded-full mr-4" src={ pictureUrl } alt={ fullName } />

			<div>
				<h2 className="text-xl text-slate-700">{ fullName }</h2>
				<p className="text-sm text-slate-400">{ mobileNumber }</p>
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
							{ location.street.number } { location.street.name },<br />
							{ location.city },<br />
							{ location.country },<br />
							{ location.postcode }
						</p>
					</div>

					<div>
						<p className="font-bold">Landline: <span>{ landlineNumber }</span></p>
						<p className="font-bold">Email: <span>{ emailAddress }</span></p>
					</div>
				</div>

				<div className="flex justify-end items-center">
					<label htmlFor="addToFavourites" className="mr-2 font-bold text-gray-400">Add to Favourites</label>
					<input name="addToFavourites" id="addToFavourites" className="w-5 h-5" type="checkbox" checked={ isFavourited } onChange={ ( e ) => { setIsFavorited( e.target.checked ) } } />
				</div>
			</div>
		) }
	</div>
}
