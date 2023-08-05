import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

// The header should contain a hamburger menu icon and page title on the left, and a profile picture on the right.

export const Header = () =>
	<header className="py-2 px-4 flex justify-between items-center bg-zinc-800">
		<div className="flex items-center space-x-3">
			<button onClick={ () => { alert( "This would show the menu!" ) } }>
				<FontAwesomeIcon className="mr-3 text-white" icon={ faBars } size="xl" />
			</button>

			<h1 className="text-2xl text-white">All Contacts</h1>
		</div>

		<img className="ml-2 rounded-full" src="https://randomuser.me/api/portraits/men/90.jpg" width="40" height="40" alt="Profile Picture" />
	</header>
