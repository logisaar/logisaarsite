import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    // em breakpoints: layouts respond to the user's font size too (identical at default settings)
    screens: {
      sm: "40em",
      md: "48em",
      lg: "64em",
      xl: "80em",
      "2xl": "96em",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "87.5rem",
      },
    },
    extend: {
      // Fluid type scale: rem + clamp, never pure vw (keeps browser zoom working). Nothing under 12px.
      fontSize: {
        label: ["clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem)", { lineHeight: "1.4" }],
        "body-sm": ["clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)", { lineHeight: "1.6" }],
        body: ["clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)", { lineHeight: "1.6" }],
        lead: ["clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)", { lineHeight: "1.6" }],
        h3: ["clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", { lineHeight: "1.25" }],
        h2: ["clamp(1.875rem, 1.4rem + 2.2vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.5rem, 1.6rem + 4.6vw, 5.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["clamp(3rem, 1.5rem + 7.5vw, 9rem)", { lineHeight: "1.1" }],
      },
      spacing: {
        section: "clamp(4rem, 3rem + 5vw, 8rem)",
        "section-sm": "clamp(3rem, 2.4rem + 3vw, 5rem)",
        gutter: "clamp(1rem, 0.6rem + 2vw, 2rem)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // darker green for TEXT, links and icons on light backgrounds (4.75:1 on white); the bright green stays a fill
          ink: "hsl(var(--primary-ink))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 0 12px hsl(var(--primary) / 0)" },
        },
        "code-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.12" },
          "25%": { transform: "translateY(-30px) rotate(5deg)", opacity: "0.22" },
          "50%": { transform: "translateY(-15px) rotate(-3deg)", opacity: "0.08" },
          "75%": { transform: "translateY(-40px) rotate(3deg)", opacity: "0.18" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "code-float": "code-float 8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
