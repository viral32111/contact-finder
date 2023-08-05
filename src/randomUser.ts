// https://randomuser.me/documentation

interface RandomUserAPIResult {
	results: User[]
	info: {
		results: number
	}
}

export interface User {
	name: {
		title: string
		first: string
		last: string
	}
	id: {
		value: string
	}
	location: Location,
	email: string
	phone: string
	cell: string
	picture: {
		large: string
	}
}

export interface Location {
	street: {
		number: number
		name: string
	}
	city: string
	state: string
	country: string
	postcode: number
}

export const fetchRandomUsers = async ( count = 1, nationality = "gb" ) => {
	const apiResponse = await fetch( `https://randomuser.me/api?results=${ count }&nationality=${ nationality }&format=json`, {
		method: "GET",
	} )

	const apiResult = await apiResponse.json() as RandomUserAPIResult

	//if ( apiResult.info.results != count ) throw new Error( "Random Users API did not return the requested number of users" )

	return apiResult.results
}
