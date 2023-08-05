import { OrderBy } from "../orderBy"

import { ContactInfo } from "../contact"

/**
 * Attributes for the filter component.
 * Includes passed down state for ordering.
 */
interface FilterAttributes {
	contacts: ContactInfo[]
	orderBy: OrderBy
	setOrderBy: ( orderBy: OrderBy ) => void
}

/**
 * Component for filtering the contacts.
 * Should contain the total number of contacts & an order by drop-down menu.
*/
export const Filter: React.FC<FilterAttributes> = ( { contacts, orderBy, setOrderBy } ) =>
	<div className="py-3 px-4 flex justify-between items-center shadow-md bg-white text-gray-400 text-sm">
		<div className="flex items-center space-x-3">
			<p className="font-normal">{ contacts.length } Contacts <span>({ contacts.filter( contact => contact.isFavourited ).length } Favs)</span></p>
		</div>

		<div className="flex items-center space-x-3">
			<label htmlFor="order-by">Order by:</label>
			<select
				name="order-by"
				className="py-1 px-2 border border-solid border-gray-200 bg-white"
				defaultValue={ orderBy }
				onChange={ ( e ) => { setOrderBy( OrderBy[ e.target.value as keyof typeof OrderBy ] ) } }
			>
				{ Object.entries( OrderBy ).map( ( [ value, displayText ] ) => <option key={ value } value={ value }>{ displayText }</option> ) }
			</select>
		</div>
	</div>
