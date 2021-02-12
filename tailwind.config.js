module.exports = {
	purge: {
		content: ["./src/**/*.{js,jsx,ts,tsx}"],
		options: {
			safelist: ["img", "img-left", "img-right", "clear", "uppercase"]
		}
	},
	darkMode: "media",
	theme: {
		container: {
			center: true,
			screens: {
				sm: "100%",
				md: "100%",
				lg: "1024px",
				xl: "1140px"
			}
		},
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
					// generate here: https://www.tailwindshades.com/
					DEFAULT: "#347184",
					50: "#BADAE4",
					100: "#A7D0DD",
					200: "#83BCCE",
					300: "#5EA9C0",
					400: "#4290A9",
					500: "#347184",
					600: "#26525F",
					700: "#17323B",
					800: "#091316",
					900: "#000000",
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
