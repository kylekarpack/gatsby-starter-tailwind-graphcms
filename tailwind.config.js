module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
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
					light: "var(--primary-bright)",
					DEFAULT: "var(--primary)",
					dark: "var(--primary-dark)"
				}
      }
    },
  },
  variants: {
    
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
}
