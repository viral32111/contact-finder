import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./components/app.tsx"
import "./index.css"

// Renders the main component on the root element.

const rootElement = document.getElementById( "root" )!

ReactDOM.createRoot( rootElement ).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
