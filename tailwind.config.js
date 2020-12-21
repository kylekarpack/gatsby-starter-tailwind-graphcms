module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": {
						opacity: 0
					},
					"100%": {
						opacity: 1
					}
				}
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out"
			},
			colors: {
				primary: {
					50: "#f9faf9",
					100: "#f4f8f0",
					200: "#e7efd9",
					300: "#d2deb7",
					400: "#a7bf7e",
					500: "#749c4a",
					600: "#456b38",
					700: "#3c5e31",
					DEFAULT: "#3c5e31",
					800: "#324527",
					900: "#273723",
					light: "var(--primary-bright)",
					dark: "var(--primary-dark)"
				}
			}
		}
	},
	variants: {
		extend: {
			display: ["group-hover"]
		}
	},
	plugins: []
};
