---
applyTo: '**'
---
---
applyTo: '**'
---

# 🤖 GitHub Copilot Instructions for Next.js Project
## Template for creating and maintaining a Next.js frontend application with clean architecture.
my-nextjs-project/
├─ app/
│  ├─ dashboard/
│  │  ├─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ types.ts
│  └─ layout.tsx
│
├─ components/
│  ├─ Button/
│  │  ├─ Button.tsx
│  │  └─ Button.types.ts
│  └─ Header/
│     ├─ Header.tsx
│     └─ Header.types.ts
│
├─ features/
│  ├─ posts/
│  │  ├─ components/
│  │  │  ├─ PostCard.tsx
│  │  │  └─ PostCard.types.ts
│  │  ├─ hooks/
│  │  │  └─ usePosts.ts
│  │  ├─ services/
│  │  │  └─ postService.ts
│  │  └─ types.ts
│  └─ auth/
│     └─ ...
│
├─ hooks/                        # Global custom hooks
│  └─ useLocalStorage.ts
│
├─ lib/                           # Utilities / infrastructure
│  └─ api.ts
│
├─ services/                      # Business logic / API integration
│  └─ analyticsService.ts
│
├─ store/                         # Redux store
│  ├─ index.ts                    # configureStore
│  ├─ rootReducer.ts
│  └─ slices/
│     ├─ authSlice.ts
│     └─ postsSlice.ts
│
├─ types/                         # Global types/interfaces
│  └─ index.ts
├─ public/
├─ tests/
├─ .env.local
├─ next.config.js
├─ tsconfig.json
├─ package.json
├─ tailwind.config.js
└─ README.md

## General Guidelines
- Use **TypeScript** instead of JavaScript.
- Follow **Next.js 13+ App Router** structure (`app/` instead of `pages/`).
- Use **functional components** with React Hooks, no class components.
- Prefer **async/await** over `.then()`.
- Use **absolute imports** (`@/components/...`, `@/lib/...`) - configure tsconfig.json baseUrl to project root.
- Keep code **modular**: split into `components/`, `features/`, `hooks/`, `lib/`, `services/`.
<!-- - **Separate interfaces and types from pages**:  
  - Do not define interfaces directly in the page component file.  
  - Put them in a dedicated `types/` folder or a `*.types.ts` file.  
  - Import interfaces into the page or component as needed. -->
---

## Styling
- Use **TailwindCSS** for all styles.
    - Install Tailwind CSS
    - Install tailwindcss, @tailwindcss/postcss, and postcss via npm.
        example: `npm install tailwindcss @tailwindcss/postcss postcss`
    - Add @tailwindcss/postcss to your postcss.config.mjs file, or wherever PostCSS is configured in your project.
    example:
            `export default {
        plugins: {
            "@tailwindcss/postcss": {},
        }
        }`
    - Add an @import to your CSS file that imports Tailwind CSS.
    example: `@import "tailwindcss";`
- Use **shadcn/ui** or **Radix UI** for accessible UI components.
- Keep className clean, use `clsx` or `tailwind-variants` when needed.

---

## Data Fetching
- use axios for API calls.
- For client-side data fetching, prefer **SWR** or **React Query**.

---

## State Management
- Use **Redux Toolkit** for all state management.

---

## Performance
- Use `next/image` for images.
- Use **dynamic imports** (`dynamic(() => import(...), { ssr: false })`) for heavy components.
- Avoid unnecessary re-renders by memoizing components/hooks.

---

## Security
- Never hardcode secrets, always use `.env`.
- Use `next-auth` or JWT for authentication.
- Do not expose sensitive information in logs.

<!-- ---

## Testing
- Use **Jest + React Testing Library** for unit tests.
- Use **Playwright** or **Cypress** for E2E tests.
- Write tests close to the code they test (`__tests__` or `*.test.tsx`).

---

## Deployment
- Optimize bundle size before deploy.
- Use **Vercel** as primary deployment target.
- Ensure `ESLint` and `Prettier` checks pass before PR merge.

--- -->

## Copilot Usage Notes
When writing code with Copilot:
1. Always generate **TypeScript code**.
2. Prefer **Server Components** unless explicitly asked for client-side.
3. Suggest **TailwindCSS classes** for UI styling.
4. **default to clean and minimal code**
5. Add JSDoc or TSDoc comments for functions and exported utilities.

---



