import colors from "tailwindcss/colors"

const brandColor = colors.gray;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NOTE: We modify the gray color, as the default Tailwind gray color is heavily saturated
        // with blue, which makes it look strange in dark mode. This gray color is more balanced,
        // and works better for sites supporting dark mode.
        gray: colors.gray,
        // Add a new "brand" color to all Tailwind utilities, so that we can easily change it.
        brand: brandColor,
      },
      // Modify the default ring color so that it matches the brand color:
      ringColor: {
        DEFAULT: brandColor['500'],
      },
    },
  },
  plugins: [],
};
