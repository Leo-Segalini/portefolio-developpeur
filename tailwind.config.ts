import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#219ebc',
          DEFAULT: '#023047',
          dark: '#8ecae6',
        },
        accent: {
          light: '#ffb703',
          DEFAULT: '#fb8500',
          dark: '#ffbf69',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#f8f9fa',
          dark: '#1a1a1a',
        },
        text: {
          light: '#1a1a1a',
          DEFAULT: '#333333',
          dark: '#f8f9fa',
        },
      },
    },
  },
  plugins: [],
};

export default config;
