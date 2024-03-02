/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{tsx,tsx,js,jsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'midnight-green': '#1A535C',
        'dark-midnight-green': '#1a435c',
        'teal': '#4ecdc4',
        'off-white': '#f7fff7',
        'offer-white': '#e5e5e5'
      }
    },
  },
  plugins: [],
}

