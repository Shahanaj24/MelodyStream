export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        soft: '0 24px 72px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.12), transparent 30%)',
      },
    },
  },
  plugins: [],
}
