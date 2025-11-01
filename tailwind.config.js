/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches your folder structure
  ],
  theme: {
  extend: {
     fontFamily: {
        abril: ["Abril Fatface", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
  },
},

  plugins: [],
}

