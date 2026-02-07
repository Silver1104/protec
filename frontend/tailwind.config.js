/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                valentine: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Pacifico', 'cursive'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '10%, 30%': { transform: 'scale(0.9)' },
                    '20%, 40%, 60%, 80%': { transform: 'scale(1.1)' },
                    '50%, 70%': { transform: 'scale(1.05)' },
                },
            },
        },
    },
    plugins: [],
};
