import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutralMighty: "var(--neutral-mighty)",
        neutralStrong: "var(--neutral-strong)",
        neutralMild: "var(--neutral-mild)",
        neutralOk: "var(--neutral-ok)",
        neutralWeak: "var(--neutral-weak)",
        neutralDead: "var(--neutral-dead)",
        primaryStrong: "var(--primary-strong)",
        primaryMild: "var(--primary-mild)",
        secondaryStrong: "var(--secondary-strong)",
        secondaryMild: "var(--secondary-mild)",
        warnStrong: "var(--warn-strong)",
        warnMild: "var(--warn-mild)",
        assureStrong: "var(--assure-strong)",
        assureMild: "var(--assure-mild)",
        bodyBg: "var(--body-bg)",
        bodyColor: "var(--body-color)",
        wrapperBg: "var(--wrapper-bg)",
        menuBg: "var(--menu-bg)",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
