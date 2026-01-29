# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture: Feature-Sliced Design (FSD)

This is a Next.js 15 App Router project using React 19 and TypeScript, organized using Feature-Sliced Design methodology.

### Core Principle

Structure code around user-facing features, not technical concerns (components, hooks, utils).

### Layer Hierarchy (Top → Bottom)

```
app/        # Entry points, global config, providers, routing
pages/      # Complete page units (1:1 mapping with URL paths)
widgets/    # Independent, composable UI blocks (header, sidebar, dashboard)
features/   # User interaction features (create-account, delete-comment, filter-list)
entities/   # Business domain data structures (user, product, order)
shared/     # Reusable common code (api, config, lib, ui)
```

### Strict Import Rules

**Upper layers may only import from lower layers:**

```
✅ features/ → entities/ → shared/
✅ pages/ → widgets/ → features/
❌ entities/ → features/        (reverse import forbidden)
❌ features/A → features/B      (same-layer import forbidden)
```

### Slice Structure

Each slice is organized by business domain:

```
features/
  create-account/
    model/      # State, logic
    ui/         # Components
    api/        # API calls
    lib/        # Utilities
    index.ts    # Public API
```

### Public API Rules

- Each slice exports only through `index.ts`
- Star exports (`export *`) forbidden
- Use explicit named exports only

```typescript
// ✅ Correct
export { CreateAccountForm } from './ui/CreateAccountForm';
export { useCreateAccount } from './model/useCreateAccount';

// ❌ Forbidden
export * from './ui';
```

### File Creation Guidelines

When adding new features:
1. Determine which layer the feature belongs to
2. Name slices as verb+noun (create-account, filter-transactions)
3. Organize slice internals into segments (model, ui, api, lib)
4. Export only Public API through index.ts

### Key Patterns

- **Client Components**: Use `'use client'` directive for all components
- **Page Params**: Always use Promise for `page.tsx` params props
- **Styling**: Tailwind CSS with CSS variables for theming (dark mode via `class`)
- **Path Alias**: Use `@/*` for imports from `src/`

### Providers (src/app/providers.tsx)

- `QueryClientProvider` - React Query with 60s staleTime default
- `ThemeProvider` - next-themes with system default

## Library Usage

- **Date/Time**: `date-fns`
- **Pattern Matching**: `ts-pattern`
- **Server State**: `@tanstack/react-query`
- **Client State**: `zustand`
- **Forms**: `react-hook-form` with `zod` for validation
- **Icons**: `lucide-react`
- **Utilities**: `es-toolkit`, `react-use`
- **UI Components**: Shadcn UI (`npx shadcn@latest add <component>`)

## Code Guidelines

- Early returns over nested conditionals
- Functional/immutable approach (use map, filter, reduce)
- Descriptive naming; minimize comments
- Pure functions where possible
- Use `TODO:` and `FIXME:` for tracking issues

## Adding Components

Shadcn UI components:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## Supabase

- Create migrations in `/supabase/migrations/` as `.sql` files
- Do not run Supabase locally
