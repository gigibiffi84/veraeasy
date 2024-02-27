const withMT = require("@material-tailwind/html/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
          "veraeasy-blue-1": {
            light: '#8ab5d6',
            "50": "#ecf3f8",
            "100": "#d8e6f1",
            "200": "#b1cde4",
            "300": "#8ab5d6",
            "400": "#639cc9",
            "500": "#3c83bb",
            "600": "#306996",
            "700": "#244f70",
            "800": "#18344b",
            "900": "#0c1a25"
          },
          'veraeasy-blue': {
            DEFAULT: '#3c83bb',
            '50': '#f3f7fc',
            '100': '#e6eff8',
            '200': '#c8ddef',
            '300': '#98c1e1',
            '400': '#619fcf',
            '500': '#3c83bb',
            '600': '#2c699d',
            '700': '#23517b',
            '800': '#22486a',
            '900': '#213e59',
            '950': '#16273b',
          },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
      require("tailwindcss-animate"),
      require('@tailwindcss/forms'),
  ],
};