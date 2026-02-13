/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#334155",
        input: "#334155",
        ring: "#FFD700",
        background: "#1a1a2e", // Dark Slate
        foreground: "#EDEDED", // Off-White (Text Primary)
        primary: {
          DEFAULT: "#FFD700", // Gold
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#16213e", // Deep Blue
          foreground: "#EDEDED",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#16213e",
          foreground: "#EDEDED",
        },
        popover: {
          DEFAULT: "#16213e",
          foreground: "#EDEDED",
        },
        card: {
          DEFAULT: "#16213e",
          foreground: "#EDEDED",
        },
        // Custom Aliases
        surface: {
          DEFAULT: "#16213e",
          hover: "#0f3460",
        },
        text: {
          primary: "#EDEDED",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
