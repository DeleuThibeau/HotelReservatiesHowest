const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      fontSize:{
        'xxxs':'0.25rem',
        'xxs':'.5rem'
      },
      fill:{
        blue: {
          100: "#caedfc",
          200: "#97defc",
          300: "#65cefc",
          400: "#01b0fc",
          500: "#019ee3",
          600: "#018dca",
          700: "#017bb0",
          800: "#016996",
          900: "#01577d",
          1000: "#004563"
        }
      },
      screens: {
        'sm': '480px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '3xl': '2400px',
        // => @media (min-width: 1960px) { ... }
      },
      extend: {
        spacing: {
          '25%': '25%', // p-80% - should work
        },
        fontFamily: {
          'Acumin-Pro': ['Acumin Pro', 'sans-serif']
        },
        fontSize: {
          xs: ['12px', '28px'],
          sm: ['14px', '20px'],
          base: ['16px', '24px'],
          lg: ['20px', '28px'],
          xl: ['24px', '32px'],
          xxl: ['32px', '40px'],
          xxxl: ['64px', '72px'],
        },
        backgroundImage:  {
          mainlg: "url('src/assets/images/main.jpg')",
          loginlg: "url('src/assets/images/login/login.png')"
        },
        backgroundSize: {
          '100%': '100%',
          '16': '4rem',
       },
       colors: {
         blue: {
           100: "#caedfc",
           200: "#97defc",
           300: "#65cefc",
           400: "#01b0fc",
           500: "#019ee3",
           600: "#018dca",
           700: "#017bb0",
           800: "#016996",
           900: "#01577d",
           1000: "#004563"
         },
         black: {
          100: "#F4F9FE",
          200: "#bfccd9",
          300: "#a8b4bf",
          400: "#929ca6",
          500: "#7b848c",
          600: "#656c73",
          700: "#4e5459",
          800: "#383c40",
          900: "#212426",
          1000: "#0b0b0c"
        },
       },
      },
      
    },
    variants: {
      extend: {},
    },
   
};
