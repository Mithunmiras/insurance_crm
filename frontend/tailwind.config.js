/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#8C6D6F',
        'brand-brown-dark': '#6F5758',
        'brand-blue': '#667eea',
        'brand-blue-dark': '#764ba2',
        'brand-gold': '#F2EBE3',
        'brand-dark-brown': '#2E2A2B',
      },
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        aurora: 'aurora 15s ease infinite',
        scroll: 'scroll 60s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        // ===== LAYOUT COMPONENTS =====
        '.main-layout': {
          '@apply flex h-screen bg-gray-50 font-inter': {},
        },
        '.content-area': {
          '@apply flex-1 flex flex-col overflow-hidden': {},
        },
        '.page-content': {
          '@apply flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6': {},
        },

        // ===== SIDEBAR COMPONENTS =====
        '.sidebar': {
          '@apply w-64 bg-white flex flex-col border-r': {},
        },
        '.sidebar-logo': {
          '@apply h-16 border-b flex items-center px-6': {},
        },
        '.sidebar-nav': {
          '@apply flex-1 px-4 py-2 space-y-1': {},
        },
        '.sidebar-nav-link': {
          '@apply flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100': {},
        },
        '.sidebar-nav-link-active': {
          '@apply bg-brand-blue bg-opacity-10 text-brand-blue font-semibold': {},
        },
        '.revenue-widget': {
          '@apply bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white p-6 rounded-lg text-center animate-aurora': {},
          'background-size': '200% 200%',
        },

        // ===== HEADER COMPONENTS =====
        '.header-bar': {
          '@apply bg-white shadow-sm': {},
        },
        '.header-search': {
          '@apply w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent': {},
        },
        '.header-notification': {
          '@apply relative p-2 text-gray-600 hover:text-brand-blue transition-colors duration-200': {},
        },
        '.header-profile': {
          '@apply flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200': {},
        },

        // ===== PAGE COMPONENTS =====
        '.page-header': {
          '@apply flex justify-between items-center mb-6': {},
        },
        '.page-title': {
          '@apply text-3xl font-bold text-gray-800': {},
        },
        '.page-subtitle': {
          '@apply text-lg text-gray-600 mb-4': {},
        },

        // ===== BUTTON COMPONENTS =====
        '.primary-button': {
          '@apply bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-shimmer': {},
          'background-size': '200% 100%',
        },
        '.secondary-button': {
          '@apply bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200': {},
        },
        '.success-button': {
          '@apply bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-200': {},
        },
        '.warning-button': {
          '@apply bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition-colors duration-200': {},
        },
        '.danger-button': {
          '@apply bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200': {},
        },
        '.alert-button': {
          '@apply w-full bg-red-100 text-red-700 font-semibold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-200 transition-colors duration-200': {},
        },

        // ===== CARD COMPONENTS =====
        '.card': {
          '@apply bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300': {},
        },
        '.card-hover': {
          '@apply hover:scale-105 transition-transform duration-300': {},
        },
        '.branch-card': {
          '@apply bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col animate-slideIn hover:scale-105': {},
        },
        '.kpi-card': {
          '@apply bg-gray-50 p-3 rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-200': {},
        },
        '.kpi-card-large': {
          '@apply bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-4': {},
        },
        '.ai-intelligence-card': {
          '@apply bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white animate-aurora p-6 rounded-xl shadow-lg': {},
          'background-size': '200% 200%',
        },
        '.dashboard-card': {
          '@apply bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300': {},
        },

        // ===== TABLE COMPONENTS =====
        '.data-table': {
          '@apply bg-white rounded-xl shadow-md overflow-hidden animate-fadeInUp': {},
        },
        '.table-container': {
          '@apply overflow-x-auto': {},
        },
        '.table': {
          '@apply w-full text-sm text-left text-gray-500': {},
        },
        '.table-header': {
          '@apply text-xs text-gray-700 uppercase bg-gray-50': {},
        },
        '.table-row': {
          '@apply bg-white border-b hover:bg-gray-50 transition-colors duration-200': {},
        },
        '.table-cell': {
          '@apply px-6 py-4': {},
        },
        '.table-cell-header': {
          '@apply px-6 py-3': {},
        },
        '.table-cell-bold': {
          '@apply px-6 py-4 font-medium text-gray-900': {},
        },

        // ===== STATUS COMPONENTS =====
        '.status-badge': {
          '@apply text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-active': {
          '@apply bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-inactive': {
          '@apply bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-scheduled': {
          '@apply bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-completed': {
          '@apply bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-pending': {
          '@apply bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-cancelled': {
          '@apply bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-medium': {
          '@apply bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-low': {
          '@apply bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },
        '.status-high': {
          '@apply bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full': {},
        },

        // ===== FORM COMPONENTS =====
        '.form-group': {
          '@apply mb-4': {},
        },
        '.form-label': {
          '@apply block text-sm font-medium text-gray-700 mb-2': {},
        },
        '.form-input': {
          '@apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors duration-200': {},
        },
        '.form-select': {
          '@apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-white transition-colors duration-200': {},
        },
        '.form-textarea': {
          '@apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-vertical min-h-24 transition-colors duration-200': {},
        },

        // ===== ANIMATION CLASSES =====
        '.animate-container': {
          '@apply animate-fadeInUp': {},
        },
        '.animate-item': {
          '@apply animate-slideIn hover:scale-105 transition-transform duration-300': {},
        },
        '.animate-grid': {
          '@apply grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp': {},
        },

        // ===== GRID LAYOUTS =====
        '.grid-1': {
          '@apply grid grid-cols-1 gap-6': {},
        },
        '.grid-2': {
          '@apply grid grid-cols-1 md:grid-cols-2 gap-6': {},
        },
        '.grid-3': {
          '@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': {},
        },
        '.grid-4': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6': {},
        },

        // ===== UTILITY CLASSES =====
        '.text-brand': {
          '@apply text-brand-blue': {},
        },
        '.bg-brand': {
          '@apply bg-brand-blue': {},
        },
        '.gradient-brand': {
          '@apply bg-gradient-to-r from-brand-blue to-brand-blue-dark': {},
        },
      })
    }
  ],
}