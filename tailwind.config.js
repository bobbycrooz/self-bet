/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        galano: ['galano-bold', 'sans-serif'],
        'galano-md': ['galano-md', 'sans-serif'],
        'galano-sb': ['galano-sb', 'sans-serif']
      },

      colors: {
        sec: "#FF4B00"
      },
      	boxShadow: {
				'soft': ' 0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
        'light': '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A',
        'bet-card': '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814'
				
			},
      keyframes: {
				'spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'spinner': 'spin 1.5s linear infinite'
			},
    },
  },
  plugins: [],
}

