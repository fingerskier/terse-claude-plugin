## Next.js + TypeScript + Tailwind + ESLint Setup

**1. Create project:**
```bash
npx create-next-app@latest my-app
```

Interactive prompts — say yes to:
- TypeScript → Yes
- ESLint → Yes
- Tailwind CSS → Yes
- `src/` directory → preference
- App Router → Yes (recommended)
- Turbopack → Yes
- Import alias → default `@/*` fine

That's it. `create-next-app` handles all config.

**2. Verify structure:**
```
my-app/
├── src/app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css    ← Tailwind directives already here
├── tailwind.config.ts ← content paths pre-configured
├── tsconfig.json      ← strict mode, path aliases set
├── eslint.config.mjs  ← next/core-web-vitals preset
└── next.config.ts
```

**3. Run:**
```bash
cd my-app && npm run dev
```

Dev server at `localhost:3000`.

**4. Optional hardening:**

Stricter ESLint — add to `eslint.config.mjs`:
```js
// extend with next/typescript for TS-specific rules
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });
export default [...compat.extends("next/core-web-vitals", "next/typescript")];
```

Strict TypeScript — in `tsconfig.json`, already set by default:
```json
"strict": true,
"noUncheckedIndexedAccess": true  ← add this for extra safety
```

**5. Tailwind customization** — edit `tailwind.config.ts`:
```ts
theme: { extend: { colors: { brand: '#your-color' } } }
```

**Key commands:**
- `npm run dev` — dev server
- `npm run build` — production build (catches TS errors)
- `npm run lint` — ESLint check

All three tools fully integrated out of box. No manual wiring needed since Next.js 13.4+.
