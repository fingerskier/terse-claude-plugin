Run one command — it scaffolds everything:

```bash
npx create-next-app@latest my-app
```

The interactive prompts will ask:

```
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → Yes
✔ Would you like to use `src/` directory? → Yes (recommended)
✔ Would you like to use App Router? → Yes (recommended)
✔ Would you like to use Turbopack for next dev? → Yes
✔ Would you like to customize the import alias? → No (keeps @/*)
```

Then:

```bash
cd my-app
npm run dev
```

App runs at `http://localhost:3000`.

## What you get

- **TypeScript** — `tsconfig.json` pre-configured, `.tsx` files throughout
- **Tailwind CSS** — `tailwind.config.ts` + `globals.css` with Tailwind directives already set up
- **ESLint** — `.eslintrc.json` with `next/core-web-vitals` preset
- **App Router** — file-based routing in `src/app/`

## Project structure

```
my-app/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Home page
│       └── globals.css     # Tailwind imports
├── public/                 # Static assets
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── package.json
```

## Optional next steps

- **Add Prettier** — `npm i -D prettier eslint-config-prettier`, then add `"prettier"` to your ESLint extends
- **Path aliases** — already configured as `@/*` mapping to `src/*`
- **Environment variables** — create `.env.local` (auto-loaded by Next.js, git-ignored)

That's it — no manual Tailwind/TypeScript/ESLint wiring needed. `create-next-app` handles all the config.
