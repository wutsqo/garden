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

## Development

Start the development server:

```bash
pnpm dev
```

Notes:

- The dev server runs on `http://localhost:3004`
- `pnpm dev:turbo` is still available if you want to test Turbopack locally
- Set `SITE_URL` explicitly so it matches your local environment

## Available Scripts

```bash
 pnpm dev       # Start Next.js with webpack on port 3004
 pnpm dev:turbo # Start Next.js with Turbopack on port 3004
 pnpm build     # Create a production build
 pnpm start     # Start the production server
 pnpm lint      # Run ESLint
 pnpm seed:homepage # Seed Homepage expertises/social links and tech stack logos into Payload
 pnpm payload   # Start Payload CLI with the local config
```

## Deployment

This project is set up around a Vercel-style deployment flow.

- Vercel can use the default package-manager install command from `package.json`
- `pnpm build` runs the Next.js production build
- Payload uses Vercel-specific adapters for Postgres and Blob storage

### Deployment environment variables

Production deployments should also set:

```bash
SITE_URL=
DISCORD_WEBHOOK_URL=
```

`SITE_URL` is important for metadata and Open Graph URLs. If it is missing, the app falls back to `http://localhost:3000`.

### Deployment caveats

- The current image allowlist and Blob URL generation are tied to the configured Mapbox, Spotify, and Vercel Blob hostnames in source
- The checked-in screenshot section uses `public/og.png`; additional generated screenshots are not checked in today

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
