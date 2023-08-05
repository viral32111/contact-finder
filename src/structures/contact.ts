/**
 * The information about a contact.
 * This is a glorified version of what the Random Users API returns, but with an is favourited property.
 */
export interface ContactInfo {
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
