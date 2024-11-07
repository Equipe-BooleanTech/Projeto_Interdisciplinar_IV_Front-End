/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { addDynamicIconSelectors } from '@iconify/tailwind';

const TAILWIND_PLUGINS = [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
];

const CUSTOM_PLUGINS = [addDynamicIconSelectors()];

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        colors: {
            primary: '#740318',
            hover: '#d33f3f',
            secondary: '#118632',
            base: '#FAFAFA',
            success: '#2E7D32',
            
        },
        fontFamily: {
            display: ['DM Sans', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
        },
        container: {
            center: true,
            padding: '1.5rem',
        },
        extend: {
            screens: {
            'xl': '1280px',
            '2xl': '1440px'
        }},
    },
    plugins: [
        ...TAILWIND_PLUGINS,
        ...CUSTOM_PLUGINS,
        require('flowbite/plugin')({
            charts: true,
        }),
    ],
};
