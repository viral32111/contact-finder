import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

/**
 * Component for the header.
 * Should contain a hamburger menu icon and page title on the left, and a profile picture on the right.
 */
export const Header = () =>
	<header className="py-2 px-4 flex justify-between items-center bg-zinc-800">
		<div className="flex items-center space-x-3">
			<button onClick={ () => { alert( "This would show the menu in a full application." ) } }>
				<FontAwesomeIcon className="mr-3 text-white" icon={ faBars } size="xl" />
			</button>

			<h1 className="text-2xl text-white">All Contacts</h1>
		</div>

		<img className="w-10 h-10 ml-2 rounded-full" src="https://randomuser.me/api/portraits/men/90.jpg" alt="Profile Picture" />
	</header>
