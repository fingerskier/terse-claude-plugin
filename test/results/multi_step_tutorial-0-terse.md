## Next.js + TypeScript + Tailwind + ESLint Setup

**1. Create project:**
```bash
npx create-next-app@latest my-app
```

Interactive prompts — say yes to TypeScript, ESLint, Tailwind CSS. Also offers App Router (recommend yes) and src/ directory (preference).

**2. That's it.** `create-next-app` handles all three automatically now:
- TypeScript: `tsconfig.json` + `.tsx` files generated
- Tailwind: `tailwind.config.ts` + `postcss.config.mjs` + directive in `globals.css`
- ESLint: `.eslintrc.json` with `next/core-web-vitals` preset

**3. Verify:**
```bash
cd my-app && npm run dev    # localhost:3000
npm run lint                # ESLint check
```

**4. Optional hardening:**
- Strict TypeScript: `"strict": true` already set by default
- Add Prettier: `npm i -D prettier eslint-config-prettier`, add `"prettier"` to eslint extends
- Path aliases: already configured — `@/*` maps to `src/*` or `./*`
- Tailwind plugins: `npm i -D @tailwindcss/typography @tailwindcss/forms`, add to `plugins` array in `tailwind.config.ts`

**5. Structure you get:**
```
app/
  layout.tsx      ← root layout
  page.tsx        ← home page
  globals.css     ← tailwind directives
public/
tailwind.config.ts
tsconfig.json
next.config.ts
```

Key thing: don't manually install tailwind/postcss/autoprefixer separately — `create-next-app` scaffolds everything wired together. Manual setup only needed if adding to existing non-Next project.
