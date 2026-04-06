Here's how to set up a new Next.js project with TypeScript, Tailwind CSS, and ESLint:

## 1. Create the project

```bash
npx create-next-app@latest my-app
```

The interactive prompts will ask you about each option. Select:

- **TypeScript?** Yes
- **ESLint?** Yes
- **Tailwind CSS?** Yes
- **`src/` directory?** Your preference (common to use `src/`)
- **App Router?** Yes (recommended for new projects)
- **Turbopack?** Yes (faster dev server)
- **Import alias?** Default `@/*` is fine

That's it — `create-next-app` scaffolds everything for you.

## 2. What it generates

```
my-app/
├── src/app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Tailwind directives
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript config
├── eslint.config.mjs     # ESLint flat config
├── next.config.ts        # Next.js config
└── package.json
```

## 3. Run it

```bash
cd my-app
npm run dev
```

Open `http://localhost:3000`.

## 4. Verify each tool is working

- **TypeScript** — rename any `.tsx` file content to have a type error; the dev server will catch it
- **Tailwind** — add a class like `text-red-500` to any element; it should render red
- **ESLint** — run `npm run lint` to check for issues

## 5. Optional but recommended additions

```bash
# Prettier (pairs well with ESLint)
npm install -D prettier eslint-config-prettier

# Path aliases already configured in tsconfig.json as @/*
# Example: import { Button } from '@/components/Button'
```

The `create-next-app` CLI handles all the wiring — Tailwind's PostCSS plugin, TypeScript's `tsconfig.json`, ESLint's Next.js-specific rules — so you don't need to configure anything manually.
