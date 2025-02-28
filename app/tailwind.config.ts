import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinecaption: ['Cinecaption', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      spacing: {
        '14': '3.5rem', // 14 を 3.5rem (56px) として追加
        '16': '4rem',   // 16 を 4rem (64px) として追加
        '20': '5rem',   // 20 を 5rem (80px) として追加
        '24': '6rem',   // 24 を 6rem (96px) として追加
        '28': '7rem',   // 28 を 7rem (112px) として追加
        '32': '8rem',   // 32 を 8rem (128px) として追加
        '36': '9rem',   // 36 を 9rem (144px) として追加
        '40': '10rem',  // 40 を 10rem (160px) として追加
        '44': '11rem',  // 44 を 11rem (176px) として追加
        '48': '12rem',  // 48 を 12rem (192px) として追加
        '52': '13rem',  // 52 を 13rem (208px) として追加
        '56': '14rem',  // 56 を 14rem (224px) として追加
        '60': '15rem',  // 60 を 15rem (240px) として追加
        '64': '16rem',  // 64 を 16rem (256px) として追加
        '72': '18rem',  // 72 を 18rem (288px) として追加
        '80': '20rem',  // 80 を 20rem (320px) として追加
        '96': '24rem',  // 96 を 24rem (384px) として追加
      },
    },
  },
  // ...
};

export default config
