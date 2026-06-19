# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/landing site for **SunPrime Consulting** (Vietnamese accounting, legal & operations consulting, with an F&B focus). Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Primary content language is Vietnamese (`vi`), with a runtime `vi`/`en` toggle.

## Commands

This project uses **Yarn (classic, 1.22)** — do not use npm (`package-lock.json` has been removed in favor of `yarn.lock`).

```bash
yarn install      # install dependencies
yarn dev          # dev server at http://localhost:3000
yarn build        # production build (also the main type/lint check before shipping)
yarn start        # serve the production build
yarn lint         # ESLint (eslint-config-next, flat config in eslint.config.mjs)
```

There is no test suite. `yarn build` is the primary verification step — it runs full type-checking and ESLint over the App Router tree.

## Architecture

### Routing & rendering
- **App Router** under `app/`. Routes are a mix of Client Components (`'use client'`, e.g. `app/page.tsx`) and async Server Components (e.g. `app/tin-tuc/page.tsx`, `app/blog/page.tsx`).
- `app/layout.tsx` is the global shell: wraps everything in `I18nProvider`, and renders `Nav`, `ScrollReveal`, `SiteFooter`, and `ContactFloatingButtons` around all pages. SEO metadata (title template, OpenGraph, Twitter) lives here.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`), so imports look like `@/components/nav`, `@/data/services`.

### Internationalization
- Client-side only, via `components/i18n-provider.tsx` (`useI18n()` hook → `{ lang, toggleLanguage }`), persisted to `localStorage` under `sunprime-lang`. There is **no i18n library and no message catalog** — bilingual strings are hardcoded inline in components as `lang === "vi" ? [...] : [...]` arrays. When adding user-facing copy to a client component, follow this pattern.

### Content sources — two distinct systems
1. **Static TypeScript data** in `data/` — `services.ts`, `partners.ts`, `feedbacks.ts`, `blog-posts.ts`. These are typed const arrays consumed directly (e.g. `serviceCategories`/`allServices` drive the home page and `app/services/[slug]`). Editing site content = editing these files.
2. **External News API** via `data/news-api.ts` — fetches live news from a backend (default `http://localhost:2412`, overridable via env). This powers the `/tin-tuc` and `/blog` routes (server-side `fetchNewsPage` with `?page` pagination) and the home page's top-news strip. Key transforms in `news-api.ts`: `toNewsPost` normalizes the API shape (including trying many possible image field names via `extractImage`), `toSlug` builds diacritic-free slugs, slugs are always `${slug}-${news_id}` so the trailing id can be parsed back out on detail pages. `data/news.ts` is a thin re-export alias of `news-api.ts`.

### News API configuration (env vars, with hardcoded fallbacks in `news-api.ts`)
- `SUNPRIME_NEWS_API_URL` — paginated news list endpoint
- `SUNPRIME_TOP_NEWS_API_URL` — pinned/top news endpoint
- `SUNPRIME_NEWS_API_TOKEN` — Bearer token

Note: a default API URL (`localhost:2412`) and a JWT token are **hardcoded as fallbacks** in `data/news-api.ts`. Set the env vars for any real (non-local) backend rather than relying on these.

- `app/api/top-news/route.ts` is a thin server route that returns `fetchTopNews()` as JSON; client components (e.g. the home page) fetch `/api/top-news` rather than calling the external API directly, keeping the token server-side. All fetches use `cache: 'no-store'`.

### Styling & assets
- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`); global styles in `app/globals.css`. Font is Inter (loaded through `next/font/google`, exposed as `--font-geist`).
- Icons are rendered with the Iconify web component (`<iconify-icon>`), loaded via a `<Script>` tag in `app/layout.tsx` — icon names like `solar:bill-list-bold-duotone` come from Iconify sets.
- `next.config.ts` whitelists remote image hosts under `images.remotePatterns` (Unsplash, Supabase, Pexels, Clearbit, flagcdn, dicebear, advokatguiden). **Any new remote image host must be added here** or `next/image` will reject it.
