// The filter should contain the total number of contacts, and an order by drop-down.

import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface ContactAttributes {
	pictureUrl: string,
	fullName: string,
	mobileNumber: string,
	landlineNumber: string,
	emailAddress: string,
	homeAddress: string
}

export const Contact: React.FC<ContactAttributes> = ( {
	pictureUrl,
	fullName,
	mobileNumber,
	landlineNumber,
	emailAddress,
	homeAddress
} ) => {
	const [ isCollapsed, setIsCollapsed ] = useState( true )

	return <div className="p-5 relative bg-white shadow-md">
		<div className="flex items-center">
			<img className="w-12 h-12 rounded-full mr-4" src={ pictureUrl } alt={ fullName } />

			<div>
				<h2 className="text-slate-900 text-xl">{ fullName }</h2>
				<p className="text-gray-400 text-sm">{ mobileNumber }</p>
			</div>

			<button
				className="ml-auto transform transition-transform"
				style={{ transform: isCollapsed ? "rotate( 0deg )" : "rotate( 180deg )" }}
				onClick={ () => setIsCollapsed( !isCollapsed ) }>

				<FontAwesomeIcon icon={ faChevronUp } size="2xl" />
			</button>
		</div>
	</div>
}
