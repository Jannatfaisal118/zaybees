/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bgLight: '#FFFFFF',    // Light mode background
        bgDark: '#121212',     // Deep luxury black (dark mode)

        // Text
        textLight: '#3A3A3A',  // Main text (light mode)
        textDark: '#EAEAEA',   // Softer off-white for dark mode

        // Headings & subtext
        heading: '#111111',    // Almost black (light mode headings)
        subtext: '#A0A0A0',    // Softer muted gray for both modes

        // Primary & accent
        primary: '#D4AF37',    // Rich gold (premium highlight)
        accent: '#C19A6B',     // Warm muted gold (hover/borders)
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
