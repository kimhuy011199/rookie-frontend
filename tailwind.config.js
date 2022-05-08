module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#36bcfb',
        secondary: '#5ec9fc',
        dark: '#382133',
      },
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
