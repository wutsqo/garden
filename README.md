# Garden

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload-3-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

Personal website, portfolio, and digital garden built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, DaisyUI, and Payload CMS.

The site combines a public-facing portfolio with CMS-managed content for projects, pages, and a bookshelf, plus a few integrations like Spotify, Mapbox, and Vercel-backed Payload storage.

## Live Demo

Production URL: [https://wutzz.space](https://wutzz.space)

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4 + DaisyUI
- Payload CMS 3
- Vercel Postgres + Vercel Blob storage

## Features

- Home page with hero, selected works, expertise, map-based about section, and contact area
- Projects listing and individual project write-ups
- Bookshelf and reading timeline pages
- CMS-managed pages and rich text content via Payload
- Spotify-powered recent track / collage features
- Project submission API with Discord webhook integration
- Payload admin available inside the app route tree

## Screenshots

Repository-available preview asset:

![Open Graph preview](./public/og.png)

This repository currently includes an Open Graph preview image in `public/og.png`. Additional page screenshots are not checked into the repo today, so this section intentionally references only assets that are already present.

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

### 3. Configure environment variables

The example file includes:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_USER_ID=
STRAVA_REFRESH_TOKEN=
SITE_URL=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
PAYLOAD_SECRET=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
```

Core variables used by the main app and CMS:

```bash
PAYLOAD_SECRET=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Feature-specific variables:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
SITE_URL=
DISCORD_WEBHOOK_URL=
```

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` enables the map-based about section
- `SITE_URL` is used for metadata, canonical URLs, and Open Graph image URLs
- `DISCORD_WEBHOOK_URL` powers the `/api/project` submission endpoint

Also referenced by the current example file:

```bash
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_USER_ID=
STRAVA_REFRESH_TOKEN=
```

`DISCORD_WEBHOOK_URL` is used by the app but is not currently listed in `.env.example`.

### 4. Ensure content is available

This repository uses a git submodule at `content/`. Some scripts depend on assets inside that directory, especially `content/public/images`.

If you cloned without submodules, initialize them before running the app:

```bash
git submodule update --init --recursive
```

## Development

Start the development server:

```bash
pnpm dev
```

Notes:

- The dev server runs on `http://localhost:3004`
- `pnpm dev` runs `scripts/static.js` before starting Next.js
- `scripts/static.js` recreates `public/images` from `content/public/images`
- Set `SITE_URL` explicitly so it matches your local environment

## Available Scripts

```bash
pnpm dev       # Run static asset sync, then start Next.js on port 3004
pnpm build     # Run static asset sync, then create a production build
pnpm start     # Start the production server
pnpm lint      # Run ESLint
pnpm collect   # Run static asset collection only
pnpm content   # Pull content updates, then collect static assets
pnpm payload   # Start Payload CLI with the local config
```

## Deployment

This project is set up around a Vercel-style deployment flow.

- `vercel.json` overrides install with `./install.sh && pnpm install`
- `install.sh` hydrates the `content/` submodule contents before dependency install completes
- `pnpm build` runs `scripts/static.js` first, which recreates `public/images` from `content/public/images`
- Payload uses Vercel-specific adapters for Postgres and Blob storage

### Deployment environment variables

If you are using the repository's current Vercel install flow from `vercel.json`, deployment also expects:

```bash
GITHUB_ACCESS_TOKEN=
GITHUB_SUBMODULE=
```

Those variables are required by `install.sh`. The script exits early if either is missing.

Production deployments should also set:

```bash
SITE_URL=
DISCORD_WEBHOOK_URL=
```

`SITE_URL` is important for metadata and Open Graph URLs. If it is missing, the app falls back to `http://localhost:3000`.

### Deployment caveats

- The repo includes a `content/` submodule, but deployment does not rely on a normal submodule checkout alone
- `scripts/static.js` removes `public/images` before copying from `content/public/images`
- If `content/public/images` is missing, the copy step is skipped and the build can still continue without those synced images
- The current image allowlist and Blob URL generation are tied to the configured Mapbox, Spotify, and Vercel Blob hostnames in source
- The checked-in screenshot section uses `public/og.png`; media inside `content/public/images` is content data, not documented as UI screenshots

## Project Structure

```text
src/
  app/
    (web)/       Public site routes
    (payload)/   Payload admin and related app routes
    api/         API endpoints
  collections/   Payload collections and content models
  components/    Shared UI and feature components
  hooks/         React hooks
  utils/         Utility helpers
scripts/         Content and static asset scripts
content/         Git submodule for content and public assets
```

## Payload CMS

Payload is integrated directly into the Next.js app. The CMS manages content for collections including:

- Projects
- Pages
- Books
- Book timelines
- Tech stacks
- Teammates
- Media

To work with Payload locally:

```bash
pnpm payload
```

## Validation

Before opening a PR, run:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

There is currently no dedicated test runner configured in this repository.

## Notes

- Pre-commit hooks are enabled through Husky and run `pnpm lint`
- `pnpm build` and `pnpm dev` both depend on the static asset sync step
- If `content/public/images` is missing, the static copy step is skipped
