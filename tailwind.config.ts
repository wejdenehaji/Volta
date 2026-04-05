import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
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
        volta: {
          base: "hsl(var(--volta-base))",
          surface: "hsl(var(--volta-surface))",
          "surface-hover": "hsl(var(--volta-surface-hover))",
          border: "hsl(var(--volta-border))",
          "border-strong": "hsl(var(--volta-border-strong))",
          text: "hsl(var(--volta-text))",
          muted: "hsl(var(--volta-muted))",
          tertiary: "hsl(var(--volta-tertiary))",
          disabled: "hsl(var(--volta-disabled))",
          brand: "hsl(var(--volta-brand))",
          "brand-hover": "hsl(var(--volta-brand-hover))",
          tint: "hsl(var(--volta-tint))",
          warning: "hsl(var(--volta-warning))",
          "warning-tint": "hsl(var(--volta-warning-tint))",
          error: "hsl(var(--volta-error))",
          "error-tint": "hsl(var(--volta-error-tint))",
          qr: "hsl(var(--volta-qr))",
          map: "hsl(var(--volta-map))",
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
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        volta: "0 24px 80px rgba(0, 0, 0, 0.42)",
        glow: "0 0 0 1px rgba(0, 229, 107, 0.24), 0 16px 60px rgba(0, 229, 107, 0.14)",
        sheet: "0 -20px 40px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "volta-grid": "linear-gradient(to right, rgba(0,229,107,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,107,0.08) 1px, transparent 1px)",
        "volta-hero": "radial-gradient(circle at 20% 20%, rgba(0,229,107,0.12), transparent 35%), radial-gradient(circle at 80% 10%, rgba(51,238,136,0.12), transparent 22%), linear-gradient(180deg, rgba(11,11,15,0.18), rgba(11,11,15,0.88))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "hero-pan": {
          "0%, 100%": { transform: "scale(1) translate3d(0,0,0)", opacity: "0.9" },
          "50%": { transform: "scale(1.08) translate3d(2%, -2%, 0)", opacity: "1" },
        },
        "pulse-line": {
          "0%": { transform: "translateY(0)", opacity: "0.25" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "ring-expand": {
          "0%": { transform: "scale(0.9)", opacity: "0.2" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hero-pan": "hero-pan 12s ease-in-out infinite",
        "pulse-line": "pulse-line 1.8s ease-out infinite",
        "soft-pulse": "soft-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "ring-expand": "ring-expand 2s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
