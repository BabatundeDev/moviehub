# MovieHub

A modern movie discovery dashboard built with React, TypeScript, Vite, and Tailwind CSS — powered by the TMDB API.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | Component architecture and type safety |
| Vite | Dev server and production build tool |
| Tailwind CSS v4 | Utility-first styling via the Vite plugin |
| TanStack Query | Async state management, caching, and request lifecycle |
| React Router v7 | Client-side routing |
| Axios | HTTP client with centralized TMDB abstraction |
| Lucide React | Icon system |

---

## Features

- **Home Page** — Now Playing and Popular movie sections with card grids, loading skeletons, and error fallbacks
- **Search & Filters** — Debounced search input with genre, year, rating, and sort-by filters plus one-click clear
- **Movie Details** — Full metadata view including cast, director, genres, runtime, budget, revenue, and a similar movies section
- **Grid Pages** — Dedicated browsing pages for Popular, Top Rated, and Upcoming movies
- **Loading states** — Animated skeleton loaders on every data-fetching surface
- **Error & Empty states** — Graceful fallbacks across all pages so the UI never breaks silently

---

## Project Structure

```
moviehub/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── tmdb.ts           # Axios TMDB client + image URL helpers
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx  # Root layout wrapper
│   │   │   └── Sidebar.tsx    # Navigation sidebar
│   │   ├── movie/
│   │   │   └── MovieCard.tsx  # Reusable movie card
│   │   └── ui/
│   │       ├── MovieGridSkeleton.tsx
│   │       ├── SectionHeader.tsx
│   │       └── States.tsx     # ErrorState + EmptyState
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useMovies.ts       # All TanStack Query hooks
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── MovieDetailPage.tsx
│   │   └── GridPage.tsx
│   ├── types/
│   │   └── movie.ts           # TypeScript interfaces
│   ├── App.tsx                # Router + QueryClient setup
│   ├── main.tsx
│   └── index.css
├── .env.example
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### 1. Get a TMDB API Key

Sign up for a free account at [themoviedb.org](https://www.themoviedb.org/), then navigate to **Settings → API → Request an API Key**.

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and paste in your key:

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

> The app will not load any data without a valid API key. All TMDB requests are free within their rate limits.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production

```bash
npm run build
```

Output is written to the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

### 6. Preview the Production Build Locally

```bash
npm run preview
```

---

## Architecture Decisions

**API Abstraction**
All TMDB calls are centralized in `src/api/tmdb.ts`. No component ever imports Axios directly — they consume typed hooks from `src/hooks/useMovies.ts`. This makes the API layer easy to swap or mock in tests.

**TanStack Query**
Handles caching (5-minute stale time), background refetching, and deduplicated requests. Every page gets consistent loading, error, and success states with minimal boilerplate.

**Debounced Search**
The `useDebounce` hook delays API calls by 400ms after the user stops typing, preventing unnecessary network traffic on every keystroke.

**Unified Filter State**
The Search page owns all filter state locally and passes it into a single `useSearchMovies` hook. The hook intelligently routes to `/search/movie` when a text query is present, or `/discover/movie` when only filters are applied — keeping query logic out of the UI layer.

**Component Reusability**
`MovieCard`, `SectionHeader`, `MovieGridSkeleton`, `ErrorState`, and `EmptyState` are shared across every page. Adding a new page requires zero new primitives.

**Type Safety**
Every API response, component prop, and hook return value is strictly typed via `src/types/movie.ts`. There is zero use of `any` throughout the codebase.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_API_KEY` | Yes | Your TMDB v3 API key |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |