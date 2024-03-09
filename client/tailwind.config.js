/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {colors:
    {
      bgcolor:'#0D1117',
      accent:'#2F81F7',
      backgroundImage: {
        'landingBg': "url('/src/assets/image.png')",
      }
    }},
  },
  plugins: [
    
  ],
}

