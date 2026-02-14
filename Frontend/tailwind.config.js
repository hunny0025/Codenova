/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // New food-themed palette
                primary: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981', // Main emerald
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                    900: '#064E3B',
                },
                secondary: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B', // Main amber
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                },
                accent: {
                    50: '#FDF2F8',
                    100: '#FCE7F3',
                    200: '#FBCFE8',
                    300: '#F9A8D4',
                    400: '#F472B6',
                    500: '#EC4899', // Main pink
                    600: '#DB2777',
                    700: '#BE185D',
                    800: '#9D174D',
                    900: '#831843',
                },
                coral: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C', // Main coral
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                },
                cream: {
                    50: '#FEFCE8',
                    100: '#FEF9C3',
                    200: '#FEF08A',
                    300: '#FDE047',
                    400: '#FACC15',
                    500: '#EAB308',
                    600: '#CA8A04',
                    700: '#A16207',
                    800: '#854D0E',
                    900: '#713F12',
                },
                dark: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'system-ui', 'sans-serif'],
                hindi: ['Noto Sans Devanagari', 'sans-serif'],
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, #10B981, #059669)',
                'secondary-gradient': 'linear-gradient(135deg, #F59E0B, #D97706)',
                'accent-gradient': 'linear-gradient(135deg, #EC4899, #DB2777)',
                'coral-gradient': 'linear-gradient(135deg, #FB923C, #F97316)',
                'hero-gradient': 'linear-gradient(135deg, #10B981, #F59E0B, #EC4899)',
                'food-gradient': 'linear-gradient(180deg, #1F2937, #111827)',
            },
            backdropBlur: {
                'glass': '20px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ripple': 'ripple 1s ease-out',
                'steam': 'steam 4s ease-in-out infinite',
                'flip': 'flip 0.6s ease-in-out',
                'glow': 'glow 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'bounce-in': 'bounceIn 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
                steam: {
                    '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
                    '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' },
                },
                flip: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' },
                },
                glow: {
                    '0%, 100%': { textShadow: '0 0 20px #10B981, 0 0 30px #10B981' },
                    '50%': { textShadow: '0 0 30px #34D399, 0 0 40px #34D399' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            boxShadow: {
                'glow-primary': '0 0 20px rgba(16, 185, 129, 0.5)',
                'glow-secondary': '0 0 20px rgba(245, 158, 11, 0.5)',
                'glow-accent': '0 0 20px rgba(236, 72, 153, 0.5)',
            },
        },
    },
    plugins: [],
}
