// The filter should contain the total number of contacts, and an order by drop-down.

import { useState } from "react"

export const Filter = () => {
	const [ contacts ] = useState( 241 )
	const [ favorites ] = useState( 12 )

	return <div className="py-3 px-4 flex justify-between items-center shadow-md bg-white text-gray-400 text-sm">
		<div className="flex items-center space-x-3">
			<p className="font-normal">{ contacts } Contacts <span>({ favorites } Favs)</span></p>
		</div>

		<div className="flex items-center space-x-3">
			<label htmlFor="order-by">Order by:</label>
			<select name="order-by" id="order-by" className="py-1 px-2 border border-solid border-gray-200 bg-white">
				<option value="name">Name</option>
				<option value="address">Address</option>
				<option value="mobile-number">Mobile Number</option>
				<option value="email-address">Email Address</option>
			</select>
		</div>
	</div>
}
