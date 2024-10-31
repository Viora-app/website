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
        neutralAbsolute: "var(--neutral-absolute)",
        neutralMighty: "var(--neutral-mighty)",
        neutralStrong: "var(--neutral-strong)",
        neutralSteady: "var(--neutral-steady)",
        neutralSoft: "var(--neutral-soft)",
        neutralLight: "var(--neutral-light)",
        neutralPale: "var(--neutral-pale)",
        neutralPure: "var(--neutral-pure)",
        primaryStrong: "var(--primary-strong)",
        primaryMild: "var(--primary-mild)",
        secondaryStrong: "var(--secondary-strong)",
        secondaryMild: "var(--secondary-mild)",
        warnStrong: "var(--warn-strong)",
        warnMild: "var(--warn-mild)",
        assureStrong: "var(--assure-strong)",
        assureMild: "var(--assure-mild)",
        skyStrong: "var(--sky-strong)",
        skyMild: "var(--sky-mild)",
        skyWeak: "var(--sky-weak)",
        amberMild: "var(--amber-mild)",
        bodyBg: "var(--body-bg)",
        bodyColor: "var(--body-color)",
        wrapperBg: "var(--wrapper-bg)",
        menuBg: "var(--menu-bg)",
        inputBg: "var(--input-bg)",
      },
      backgroundImage: {
        stripes: "url('/images/stripespattern.png')",
      }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
