export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}", // <--- Vital for root files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}