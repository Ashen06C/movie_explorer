# Movie Explorer

A responsive React movie discovery app built with Create React App, Material UI, Axios, React Router, and the TMDb API.

## Features

- Demo sign-in with a username and password (session only)
- Weekly trending movies and a featured film
- Search with debouncing, infinite scrolling, and a **Load more** button
- Movie details with overview, rating, genres, runtime, cast, and embedded YouTube trailer when TMDb provides one
- Genre, release year, and minimum rating filters for the movies currently loaded
- Persistent watchlist, last search, and light/dark mode using local storage
- Responsive layouts, loading/empty states, and helpful API error messages
- A small curated preview collection when no TMDb credential is supplied

### Bonus Features

- **Multi-criteria Filtering**: Filter movies by genre, release year, and minimum rating (7+, 8+, 9+)
- **YouTube Trailers**: Embedded responsive YouTube trailer player via TMDb video keys
- **Flexible Paging Modes**: Toggle switch between **Auto-scroll (Infinite Scroll)** and **"Click to load" (Load More button)** for better UX and footer access

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
npm install
cp .env.example .env
```

Edit `.env` and set **one** of these values from your [TMDb API settings](https://www.themoviedb.org/settings/api):

```env
REACT_APP_TMDB_API_KEY=your_v3_api_key
```

Then run:

```bash
npm start
```

Open `http://localhost:3000`. Sign in with any username of at least 2 characters and password of at least 4 characters. This is a **demo interface**, not account authentication; passwords are never sent or stored. A production app needs a real authentication service.

Without a TMDb credential, the app opens in preview mode with a limited sample catalog. Add a credential to enable live trending, full search, cast, and trailers. Restart the development server after changing `.env`.

## Build and deploy

```bash
npm run build
```

Deploy the repository to Vercel or Netlify as a Create React App project. Use `npm run build` as the build command and `build` as the output directory. Set one of the `REACT_APP_TMDB_*` environment variables in the hosting dashboard and rebuild. `vercel.json` and `public/_redirects` provide route fallback for direct links to movie details and the watchlist.

Create React App includes `REACT_APP_*` values in browser JavaScript. Treat a TMDb key as a **public client credential**, restrict it where TMDb permits, and use a backend proxy if you need a private credential. Never use this demo sign-in to protect sensitive data.

## API usage

Axios requests are centralized in [`src/api/tmdb.js`](src/api/tmdb.js). The app calls:

| Purpose | TMDb v3 endpoint |
| --- | --- |
| Weekly trending | `GET /trending/movie/week` |
| Movie search | `GET /search/movie?query=...&page=...` |
| Movie details, cast, trailer | `GET /movie/{id}?append_to_response=credits,videos` |

Poster and backdrop paths use TMDb's `image.tmdb.org/t/p` image service. Search filters apply to loaded search pages, so more matches may appear as you scroll or load more. TMDb errors are handled in the UI, including invalid credentials, missing movies, and rate limits.

## Project structure

```text
src/
  api/         TMDb Axios client and image helpers
  components/  Header, search bar, movie card, grid
  context/     Shared watchlist, search, theme, session state
  data/        Preview collection
  pages/       Login, discover, details, watchlist
  App.jsx      Routes and theme
  styles.css   Responsive design
```

## Attribution

Movie data and images are supplied by [TMDb](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB. The app's footer displays TMDb's approved logo and attribution.

TMDb documentation: [authentication](https://developer.themoviedb.org/docs/authentication-application), [search](https://developer.themoviedb.org/docs/search-and-query-for-details), [append to response](https://developer.themoviedb.org/docs/append-to-response), [images](https://developer.themoviedb.org/docs/image-basics).
