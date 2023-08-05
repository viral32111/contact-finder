import { Contact } from "./contact"

// The container holds the contacts.

export const Container = () =>
	<div className="py-10 px-16 space-y-5">
		<Contact
			pictureUrl="https://randomuser.me/api/portraits/men/90.jpg"
			fullName="Terry Bloggs"
			mobileNumber="0741-713-263"
			landlineNumber="015394 92955"
			emailAddress="joe.bloggs@example.com"
			homeAddress={ {
				houseNumber: 384,
				streetName: "George Street",
				cityName: "Leicester",
				countyName: "Essex",
				postCode: "H52 1FE"
			} } />
		<Contact
			pictureUrl="https://randomuser.me/api/portraits/men/90.jpg"
			fullName="Terry Bloggs"
			mobileNumber="0741-713-263"
			landlineNumber="015394 92955"
			emailAddress="joe.bloggs@example.com"
			homeAddress={ {
				houseNumber: 384,
				streetName: "George Street",
				cityName: "Leicester",
				countyName: "Essex",
				postCode: "H52 1FE"
			} } />
		<Contact
			pictureUrl="https://randomuser.me/api/portraits/men/90.jpg"
			fullName="Terry Bloggs"
			mobileNumber="0741-713-263"
			landlineNumber="015394 92955"
			emailAddress="joe.bloggs@example.com"
			homeAddress={ {
				houseNumber: 384,
				streetName: "George Street",
				cityName: "Leicester",
				countyName: "Essex",
				postCode: "H52 1FE"
			} } />
		<Contact
			pictureUrl="https://randomuser.me/api/portraits/men/90.jpg"
			fullName="Terry Bloggs"
			mobileNumber="0741-713-263"
			landlineNumber="015394 92955"
			emailAddress="joe.bloggs@example.com"
			homeAddress={ {
				houseNumber: 384,
				streetName: "George Street",
				cityName: "Leicester",
				countyName: "Essex",
				postCode: "H52 1FE"
			} } />
	</div>
