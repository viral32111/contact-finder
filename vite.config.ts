import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig( {
	base: "", // Remove leading slash from assets - https://stackoverflow.com/a/78204770
	plugins: [ react() ],
} )
