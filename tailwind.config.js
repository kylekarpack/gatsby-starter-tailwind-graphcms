module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
		extend: {
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
