module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  safelist: [
    'text-base',
    'text-lg',
    'text-xl',
    'font-friendly',
    'font-serif',
    'font-sans',
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#3B82F6',
        primaryYellow: '#FBBF24',
        primaryGreen: '#10B981',
        secondaryPurple: '#A78BFA',
        secondaryPink: '#FB7185',
        secondaryOrange: '#FB923C',
        bgLightBlue: '#F0F9FF',
        bgLightYellow: '#FEF3C7',
        bgLightGreen: '#F0FDF4',
        textGray: '#374151',
        accent: '#FFC107',
        funPink: '#FF69B4',
        cartoonBorder: '#FF4500',
      },
      fontFamily: {
        friendly: ['Fredoka', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
        sans: ['Arial', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1rem',
        cartoon: '1.5rem',
      },
      boxShadow: {
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        cartoon: '0 4px 6px rgba(255, 69, 0, 0.3)',
      },
      transitionDuration: {
        300: '300ms',
      },
      rotate: {
        1: '1deg',
        '-1': '-1deg',
        2: '2deg',
      },
    },
  },
  plugins: [],
};