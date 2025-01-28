/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        "min-390": "390px",
      },
      textColor: {
        skin: {
          primary: withOpacity("--color-text-primary"),
          secondary: withOpacity("--color-text-secondary"),
          warning: withOpacity("--color-text-warning"),
          normal: withOpacity("--color-text-normal"),
          white: withOpacity("--color-text-white"),
          light: withOpacity("--color-text-light"),
          icons: withOpacity("--color-text-icons"),
          "secondary-light": withOpacity("--color-text-secondary-light"),
          button: withOpacity("--color-text-button"),
        },
      },
      fill: {
        skin: {
          primary: withOpacity("--color-text-primary"),
          secondary: withOpacity("--color-text-secondary"),
          normal: withOpacity("--color-text-normal"),
          white: withOpacity("--color-text-white"),
          light: withOpacity("--color-text-light"),
          icons: withOpacity("--color-text-icons"),
          "secondary-light": withOpacity("--color-text-secondary-light"),
          button: withOpacity("--color-text-button"),
        },
      },
      stroke: {
        skin: {
          primary: withOpacity("--color-text-primary"),
          secondary: withOpacity("--color-text-secondary"),
          normal: withOpacity("--color-text-normal"),
          white: withOpacity("--color-text-white"),
          light: withOpacity("--color-text-light"),
          icons: withOpacity("--color-text-icons"),
          "secondary-light": withOpacity("--color-text-secondary-light"),
        },
      },
      backgroundColor: {
        skin: {
          background: withOpacity("--color-bg-background"),
          nav: withOpacity("--color-nav-background"),
          primary: withOpacity("--color-bg-primary"),
          warning: withOpacity("--color-bg-warning"),
          secondary: withOpacity("--color-bg-secondary"),
          cards: withOpacity("--color-bg-cards"),
          light: withOpacity("--color-bg-light"),
          button: withOpacity("--color-bg-button"),
          "button-disabled": withOpacity("--color-bg-button-disabled"),
          "secondary-light": withOpacity("--color-bg-secondary-light"),
          "primary-light": withOpacity("--color-bg-primary-light"),
          "hover-list": withOpacity("--color-bg-primary-light"),
          input: withOpacity("--color-bg-input"),
          modal: withOpacity("--color-bg-modal"),
          danger: withOpacity("--color-bg-danger"),
          normal: withOpacity("--color-text-normal"),
          list: withOpacity("--color-bg-list"),
          receipt: withOpacity("--color-bg-receipt"),
          // white: withOpacity("--color-bg-white"),
        },
      },
      boxShadow: {
        custom: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
      borderColor: {
        skin: {
          borderColor: withOpacity("--color-borderColor"),
          primary: withOpacity("--color-border-primary"),
          secondary: withOpacity("--color-border-secondary"),
          "secondary-light": withOpacity("--color-border-secondary-light"),
        },
      },
      ringColor: {
        skin: {
          primary: withOpacity("--color-border-primary"),
          secondary: withOpacity("--color-border-secondary"),
        },
      },
      maxWidth: {
        skin: "var(--max-width)",
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
    },
  },
  plugins: [],
};
