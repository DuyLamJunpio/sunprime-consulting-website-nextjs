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
2. **External News API** via `data/news-api.ts` — fetches live news from a backend (default `https://api.sunprime.vn`, overridable via env). This powers the `/tin-tuc` and `/blog` routes (server-side `fetchNewsPage` with `?page` pagination) and the home page's top-news strip. Key transforms in `news-api.ts`: `toNewsPost` normalizes the API shape (including trying many possible image field names via `extractImage`), `toSlug` builds diacritic-free slugs, slugs are always `${slug}-${news_id}` so the trailing id can be parsed back out on detail pages. `data/news.ts` is a thin re-export alias of `news-api.ts`.

### News API configuration (env vars, with hardcoded fallbacks in `news-api.ts`)
- `SUNPRIME_NEWS_API_URL` — paginated news list endpoint
- `SUNPRIME_TOP_NEWS_API_URL` — pinned/top news endpoint
- `SUNPRIME_NEWS_API_TOKEN` — Bearer token

Note: `SUNPRIME_API_BASE_URL` defaults to `https://api.sunprime.vn` (override for local dev, e.g. `http://localhost:2412`). The news endpoint is public, so `SUNPRIME_NEWS_API_TOKEN` is optional and has **no hardcoded fallback** — never commit a token. A user-scoped JWT was committed in the past (still in git history) and must be revoked/rotated on the backend. Article HTML from the API is sanitized server-side in `toNewsPost` via `lib/sanitize.ts` (allowlist) before it reaches `dangerouslySetInnerHTML`; extend that allowlist if the CMS legitimately needs more tags (e.g. embeds).

- `app/api/top-news/route.ts` is a thin server route that returns `fetchTopNews()` as JSON; client components (e.g. the home page) fetch `/api/top-news` rather than calling the external API directly, keeping the token server-side. All fetches use `cache: 'no-store'`.

### Sample content flag, services data, legal pages
- **Sample content is hidden by default.** The company was founded 2025-08-27 and has no real client data yet, so the fake clients/logos, team, reviews, industry counts, "latest updates" box and `/stories` case studies (`data/partners.ts`, `data/feedbacks.ts`, parts of `app/page.tsx`) are gated behind `showSampleContent` in `lib/feature-flags.ts` (env `NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=true` re-enables). `/stories` returns 404 and is left out of the sitemap while the flag is off. Do not turn it on for production until the content is real.
- **Services:** `data/services.ts` holds the base categories; `data/services-profile.ts` adds the offerings/categories from the company profile (PROFILE.pdf) in both languages and is merged in via `mergeProfileServices`. Keep `slug`/`id` identical across `vi` and `en`.
- **Company facts** (legal name, tax code, representative, founding date, address) live in `lib/site.ts` and render in the footer legal block and JSON-LD.
- **Legal pages:** `/chinh-sach-bao-mat`, `/dieu-khoan-su-dung`, `/chinh-sach-cookie` render from `data/legal.ts` (vi/en). They describe the current reality (no forms, no analytics, only `sunprime-lang` in localStorage, Google Maps embed, Iconify CDN) — update them if tracking, forms or new third parties are added. Drafted without legal review.
- **Security helpers:** `lib/json-ld.ts` (`serializeJsonLd`, escapes `<`) for every JSON-LD script; `next.config.ts` sets baseline security headers (no CSP yet — it needs browser testing against Iconify, Google Maps and inline scripts).

### Styling & assets
- Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`); global styles in `app/globals.css`. Font is Inter (loaded through `next/font/google`, exposed as `--font-geist`).
- Icons are rendered with the Iconify web component (`<iconify-icon>`), loaded via a `<Script>` tag in `app/layout.tsx` — icon names like `solar:bill-list-bold-duotone` come from Iconify sets.
- `next.config.ts` whitelists remote image hosts under `images.remotePatterns` (Unsplash, Supabase, Pexels, Clearbit, flagcdn, dicebear, advokatguiden). **Any new remote image host must be added here** or `next/image` will reject it.
