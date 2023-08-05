/**
 * Struture of the JSON response from the Random User API.
 * https://randomuser.me/documentation
 */
interface RandomUserAPIResult {
	results: User[]
	info: {
		results: number
	}
}

/**
 * Structure of the users within the Random User API response.
 * This is in a separate interface to allow other parts of the app to use it without having the whole API response.
 */
export interface User {
	name: {
		first: string
		last: string
	}
	id: {
		value: string
	}
	location: {
		street: {
			number: number
			name: string
		}
		city: string
		state: string
		country: string
		postcode: string
	}
	email: string
	phone: string
	cell: string
	picture: {
		large: string
	}
}

/**
 * Fetches a given number of random users from the Random User API (https://randomuser.me).
 * @param count The number of users to fetch.
 * @param nationality The country code to only fetch users of a nationality.
 * @returns An array of users.
 */
export const fetchRandomUsers = async ( count = 1, nationality = "gb" ) => {

	// Query the API, expecting a JSON response to avoid blocking renders
	const apiResponse = await fetch( `https://randomuser.me/api?results=${ count }&nationality=${ nationality }&format=json`, {
		method: "GET",
		headers: { "Accept": "application/json" }
	} )

	// Parse the response as JSON
	const apiResult = await apiResponse.json() as RandomUserAPIResult

	// Fail if the API returned less than the requested number of users
	if ( apiResult.info.results < count ) throw new Error( "Random Users API did not return the requested number of users" )

	// Return just the users
	return apiResult.results

}
