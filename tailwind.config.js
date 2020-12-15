module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
		extend: {
      colors: {
        primary: "var(--primary)"
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
