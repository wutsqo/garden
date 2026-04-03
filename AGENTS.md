# AGENTS.md

This file is guidance for coding agents working in this repository.
It captures the current toolchain, commands, and coding conventions inferred from the codebase.

## Project Snapshot

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, DaisyUI, Payload CMS.
- Package manager: `pnpm` (`packageManager` is pinned in `package.json`).
- Runtime notes:
  - `dev` and `build` run `scripts/static.js` first.
  - Payload is integrated via `withPayload(nextConfig)` and route groups under `src/app/(payload)`.
- Linting: ESLint with `next/core-web-vitals`.
- Formatting: Prettier with `printWidth: 120` and `prettier-plugin-tailwindcss`.
- TS strict mode is enabled.

## Cursor / Copilot Rules

- Checked for Cursor rules in `.cursor/rules/`: none found.
- Checked for root `.cursorrules`: none found.
- Checked for Copilot instructions in `.github/copilot-instructions.md`: none found.
- If any of these files are added later, treat them as higher-priority constraints and update this document.

## Install & Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Fill required env vars before running APIs/Payload:
   - `PAYLOAD_SECRET`, `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`
   - Spotify, Strava, Mapbox, and site URL vars as needed by touched features

## Build / Lint / Test Commands

### Core Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm content
pnpm collect
pnpm payload
```

### Command Behavior Notes

- `pnpm dev`: runs static generation script, then starts Next dev server on port `3004` with webpack for more reliable local refresh behavior.
- `pnpm dev:turbo`: runs static generation script, then starts Next dev server on port `3004` with Turbopack.
- `pnpm build`: runs static generation script, then production build.
- `pnpm lint`: ESLint over entire repo with cache at `.next/cache/eslint`.
- `pnpm content`: runs `scripts/content.js` then `scripts/static.js`.
- `pnpm collect`: runs only `scripts/static.js`.
- `pnpm payload`: starts Payload CLI using `PAYLOAD_CONFIG_PATH=./payload.config.ts`.

### Type Checking

- There is no dedicated `typecheck` script.
- Use:

```bash
pnpm exec tsc --noEmit
```

### Tests (Current State)

- No test runner (Vitest/Jest/Playwright/Cypress) is currently configured.
- No `test` script exists in `package.json`.
- There are no repository test files matching `*.test.*` or `*.spec.*`.

### Running a Single Test

- Not available yet in the current repository state.
- If a test framework is introduced, add explicit scripts and document single-test usage here.
- Recommended future convention (if Vitest is added):

```bash
pnpm vitest run path/to/file.test.ts
pnpm vitest run path/to/file.test.ts -t "case name"
```

## Pre-commit / CI Expectations

- Husky is enabled via `prepare` script.
- Pre-commit hook (`.husky/pre-commit`) runs:

```bash
pnpm lint
```

- Before opening a PR, at minimum run:

```bash
pnpm lint && pnpm exec tsc --noEmit && pnpm build
```

## Git Commit Message Convention

- Follow the existing repository style: start commit subjects with an emoji, then a short imperative phrase.
- Preferred format:

```text
<emoji> <Imperative summary>
```

- Keep subject lines concise (roughly 5-12 words), clear, and action-oriented.
- Match common verbs from history: `Add`, `Update`, `Fix`, `Remove`, `Refactor`, `Migrate`, `Upgrade`, `Regenerate`.
- Do not add a trailing period in the subject.
- If a scope/label is needed for compatibility (e.g. `feat:`), keep it after the emoji and keep the rest concise.
- Examples aligned with current history:
  - `🧰 Update Payload admin import map and dev origin config`
  - `🔒 Fix security vulnerabilities and harden public endpoints`
  - `✨ Add Table of Contents to project write-up page`
  - `🔥 Remove duplicate media queries in globals.css`
  - `⬆️ Update dependencies in package.json`

## Code Style Guidelines

### Language, Types, and Safety

- Prefer TypeScript (`.ts`/`.tsx`) for all app code.
- Keep `strict`-compatible typing; avoid introducing `any` unless unavoidable.
- Prefer explicit return types on exported functions in shared/util modules.
- Use type-only imports where appropriate (`import type { ... } from ...`).
- Validate env vars before use in server code (see `getRequiredEnv` pattern).

### Imports and Module Structure

- Use path aliases from `tsconfig.json`:
  - `@/*`, `@components/*`, `@utils/*`, `@hooks/*`, `@fields/*`, `@content/*`, `@images/*`.
- Prefer alias imports over deep relative imports when crossing feature boundaries.
- Keep import groups readable (framework/external first, then internal aliases, then local files).
- Use local `./interface` or `index.type.ts` for nearby type contracts when already established.

### Naming Conventions

- Components: PascalCase (`Button`, `PageTitle`, `RootLayout`).
- Hooks: `use*` camelCase (`useWindowSize`, `useMousePosition`).
- Utility functions/variables: camelCase.
- Constants: UPPER_SNAKE_CASE for fixed limits/regex/time windows.
- File names: mostly kebab-case folders/files with `index.tsx` entry pattern; follow surrounding file style.
- Payload collection exports: PascalCase plural objects (`Projects`, `Books`, `TechStacks`).

### React / Next.js Patterns

- Prefer Server Components by default; add `"use client"` only when needed.
- Use App Router conventions (`page.tsx`, `layout.tsx`, route handlers in `route.ts`/`route.tsx`).
- For APIs, return `NextResponse.json(...)` with explicit status codes for failures.
- Use `revalidate` / `revalidatePath` patterns already present for cache invalidation.
- Use `next/font` and CSS variables for typography; keep consistent with existing `globals.css` theme tokens.

### Formatting and Styling

- Prettier governs formatting; do not hand-format against it.
- Max line width target is 120.
- Use double quotes and semicolons (project default as formatted).
- Tailwind classes are auto-sorted via Prettier plugin; do not manually fight class ordering.
- Reuse theme tokens and utilities from `src/app/(web)/globals.css` when possible.

### Error Handling and Validation

- Fail fast for missing required server configuration (throw or guarded 5xx response).
- Validate external input early (length, format, required fields, anti-spam/honeypot checks).
- Use user-safe error responses from API routes; do not leak secrets/internal details.
- Wrap network calls in `try/catch` when failure is expected and map to meaningful HTTP responses.
- Use request timeouts for external fetches when appropriate (`AbortSignal.timeout(...)` pattern exists).

### Scripts and Node Utilities

- Script entrypoints commonly use `main().catch(...)` + `process.exit(1)`.
- Keep scripts idempotent where possible (safe to rerun).
- Preserve current script language choices (`.js` and `.ts`) unless there is clear value in migration.

## Agent Working Agreement

- Make minimal, focused changes that match existing architecture and naming.
- Do not introduce new frameworks/tools unless required by the task.
- If adding tests in the future, also add `package.json` scripts and update this file with single-test commands.
- When changing commands/tooling/config, update `AGENTS.md` in the same change.
