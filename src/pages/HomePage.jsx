import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import HeroBanner from '../components/HeroBanner';
import FilterBar from '../components/FilterBar';
import PopularSearches from '../components/PopularSearches';
import MovieGridSkeleton from '../components/MovieGridSkeleton';
import { useMovies } from '../context/MovieContext';
import { friendlyApiError, getTrending, hasTmdbCredentials, searchMovies } from '../api/tmdb';
import { demoMovies } from '../data/demoMovies';

const genreOptions = [
  { id: '', label: 'All genres' },
  { id: '28', label: 'Action' },
  { id: '12', label: 'Adventure' },
  { id: '16', label: 'Animation' },
  { id: '35', label: 'Comedy' },
  { id: '80', label: 'Crime' },
  { id: '18', label: 'Drama' },
  { id: '36', label: 'History' },
  { id: '878', label: 'Sci-Fi' },
];

const popularList = ['Dune', 'Oppenheimer', 'Spider-Man', 'Barbie', 'Avatar', 'Interstellar'];

export default function HomePage() {
  const { username, lastSearch, saveSearch, favorites } = useMovies();
  const [searchInput, setSearchInput] = useState(lastSearch);
  const [query, setQuery] = useState(lastSearch);
  const [trending, setTrending] = useState(hasTmdbCredentials ? [] : demoMovies);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingTrending, setLoadingTrending] = useState(hasTmdbCredentials);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [trendingError, setTrendingError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [retry, setRetry] = useState(0);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [scrollMode, setScrollMode] = useState('infinite');
  const sentinel = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = searchInput.trim();
      if (next !== query) {
        setQuery(next);
        setPage(1);
        setResults([]);
        setSearchError('');
        saveSearch(next);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [searchInput, query, saveSearch]);

  useEffect(() => {
    if (!hasTmdbCredentials) return;
    const controller = new AbortController();
    setLoadingTrending(true);
    setTrendingError('');
    getTrending(controller.signal)
      .then(setTrending)
      .catch((error) => {
        if (!controller.signal.aborted) setTrendingError(friendlyApiError(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingTrending(false);
      });
    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    if (!query) return;
    if (!hasTmdbCredentials) {
      setResults(demoMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())));
      setTotalPages(1);
      return;
    }
    const controller = new AbortController();
    setLoadingSearch(true);
    setSearchError('');
    searchMovies(query, page, controller.signal)
      .then((data) => {
        const incoming = data.results || [];
        setResults((current) =>
          page === 1 ? incoming : [...current, ...incoming.filter((movie) => !current.some((item) => item.id === movie.id))]
        );
        setTotalPages(Math.min(data.total_pages || 1, 500));
      })
      .catch((error) => {
        if (!controller.signal.aborted) setSearchError(friendlyApiError(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingSearch(false);
      });
    return () => controller.abort();
  }, [query, page, retry]);

  const hasMore = Boolean(query && hasTmdbCredentials && page < totalPages && !searchError);

  useEffect(() => {
    if (!hasMore || loadingSearch || !sentinel.current || scrollMode !== 'infinite') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setPage((current) => current + 1);
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [hasMore, loadingSearch, results.length, scrollMode]);

  const baseMovies = query ? results : trending;
  const filteredMovies = useMemo(() => {
    return baseMovies.filter((movie) => {
      const matchesGenre =
        !genre || movie.genre_ids?.includes(Number(genre)) || movie.genres?.some((item) => item.id === Number(genre));
      const matchesYear = !year || movie.release_date?.startsWith(year);
      const matchesRating = !rating || Number(movie.vote_average || 0) >= Number(rating);
      return matchesGenre && matchesYear && matchesRating;
    });
  }, [baseMovies, genre, year, rating]);

  const years = [...new Set(baseMovies.map((movie) => movie.release_date?.slice(0, 4)).filter(Boolean))].sort((a, b) =>
    b.localeCompare(a)
  );

  const spotlightList = trending.slice(0, 3);
  const featured = spotlightList[spotlightIndex] || trending[0] || demoMovies[0];
  const isLoading = query ? loadingSearch : loadingTrending;
  const error = query ? searchError : trendingError;

  const submitSearch = () => {
    const next = searchInput.trim();
    setQuery(next);
    setPage(1);
    setResults([]);
    saveSearch(next);
  };

  const handleChipClick = (term) => {
    setSearchInput(term);
    setQuery(term);
    setPage(1);
    setResults([]);
    saveSearch(term);
  };

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev === 0 ? Math.max(0, spotlightList.length - 1) : prev - 1));
  };

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev >= spotlightList.length - 1 ? 0 : prev + 1));
  };

  return (
    <main>
      <div className="page-container">
        {/* Welcome greeting */}
        <Box
          sx={{
            py: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--subtle)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '1.8px',
          }}
        >
          <span>GOOD TO SEE YOU, {username.toUpperCase()}</span>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            A LITTLE CINEMA, A LOT OF MAGIC <span style={{ color: 'var(--accent)', fontSize: '15px' }}>✦</span>
          </Box>
        </Box>

        {/* Modular Hero Spotlight Carousel */}
        <HeroBanner
          featured={featured}
          spotlightList={spotlightList}
          spotlightIndex={spotlightIndex}
          onPrev={handlePrevSpotlight}
          onNext={handleNextSpotlight}
        />

        {/* Discovery & Search Section */}
        <section className="discovery" id="discover">
          <div className="section-intro">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> THE DISCOVERY ROOM
              </div>
              <h2>
                What are you in the mood <em>for?</em>
              </h2>
              <p>Search a title, follow a feeling, or see what everyone is watching.</p>
            </div>
            <Link to="/favorites" className="watchlist-link" aria-label="Go to your watchlist">
              <LocalMoviesRoundedIcon /> <span>Your watchlist</span> <b>{favorites.length.toString().padStart(2, '0')}</b>
            </Link>
          </div>

          {/* Modular SearchBar */}
          <Box sx={{ mt: 3.5 }}>
            <SearchBar value={searchInput} onChange={setSearchInput} onSubmit={submitSearch} />
          </Box>

          {/* Modular Popular Searches */}
          <PopularSearches searches={popularList} activeSearch={searchInput} onSelect={handleChipClick} />

          {/* Modular FilterBar */}
          <FilterBar
            genre={genre}
            year={year}
            rating={rating}
            genreOptions={genreOptions}
            years={years}
            onGenreChange={setGenre}
            onYearChange={setYear}
            onRatingChange={setRating}
            onClear={() => {
              setGenre('');
              setYear('');
              setRating('');
            }}
          />
        </section>

        {/* Results Section */}
        <section className="results-section" aria-live="polite">
          <div className="results-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> {query ? 'YOUR SEARCH' : 'CURATED FOR YOU'}
              </div>
              <h2>
                {query ? (
                  <>
                    Results for <em>“{query}”</em>
                  </>
                ) : (
                  <>
                    Trending <em>right now.</em>
                  </>
                )}
              </h2>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {query && hasMore && (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 800, color: 'var(--subtle)', letterSpacing: '1px' }}>
                    PAGING:
                  </Typography>
                  <ToggleButtonGroup
                    value={scrollMode}
                    exclusive
                    onChange={(_, next) => next && setScrollMode(next)}
                    size="small"
                    aria-label="Paging mode"
                    sx={{
                      bgcolor: 'var(--surface)',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      height: 30,
                      '& .MuiToggleButton-root': {
                        color: 'var(--muted)',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'none',
                        px: 1.5,
                        py: 0,
                        border: 'none',
                        '&.Mui-selected': {
                          bgcolor: 'var(--accent)',
                          color: 'var(--accent-ink)',
                          '&:hover': { bgcolor: 'var(--accent)' },
                        },
                      },
                    }}
                  >
                    <ToggleButton value="infinite">Auto-scroll</ToggleButton>
                    <ToggleButton value="manual">Click to load</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              )}
              <Typography
                component="span"
                sx={{
                  color: 'var(--subtle)',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '1.4px',
                  whiteSpace: 'nowrap',
                  pb: 0.5,
                }}
              >
                {filteredMovies.length} {filteredMovies.length === 1 ? 'FILM' : 'FILMS'} {query && hasMore ? 'LOADED' : 'TO EXPLORE'}
              </Typography>
            </Box>
          </div>

          {!hasTmdbCredentials && (
            <Alert severity="info" className="demo-alert" sx={{ fontSize: '13px', borderRadius: '10px' }}>
              Preview mode: add a TMDb credential in <code>.env</code> for live movies, full search, and trailers.
            </Alert>
          )}

          {error && (
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={() => setRetry((value) => value + 1)}>
                  Retry
                </Button>
              }
              sx={{ fontSize: '13px', borderRadius: '10px', mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {/* Modular Skeleton Loader */}
          {isLoading && filteredMovies.length === 0 && <MovieGridSkeleton count={10} />}

          {/* Modular MovieGrid */}
          {filteredMovies.length > 0 && <MovieGrid movies={filteredMovies} />}

          {/* Spinner during infinite scroll page load */}
          {isLoading && filteredMovies.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: 'var(--muted)', py: 6 }}>
              <CircularProgress size={28} sx={{ color: 'var(--accent)' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Loading more movies...</Typography>
            </Box>
          )}

          {/* Empty state */}
          {!isLoading && !error && filteredMovies.length === 0 && (
            <div className="empty-state">
              <SearchOffRoundedIcon sx={{ fontSize: 48, color: 'var(--accent)', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                No movies found
              </Typography>
              <Typography sx={{ color: 'var(--muted)', fontSize: '14px', maxWidth: 400 }}>
                Try another title or adjust your filters to discover more films.
              </Typography>
            </div>
          )}

          {/* Load More Button & Sentinel */}
          {hasMore && !loadingSearch && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, pt: 5 }} ref={sentinel}>
              <Button
                onClick={() => setPage((value) => value + 1)}
                variant={scrollMode === 'manual' ? 'contained' : 'outlined'}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  bgcolor: scrollMode === 'manual' ? 'var(--accent)' : 'transparent',
                  color: scrollMode === 'manual' ? 'var(--accent-ink)' : 'var(--text)',
                  borderColor: 'var(--line)',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  px: 4,
                  py: 1.25,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'var(--accent)',
                    bgcolor: scrollMode === 'manual' ? 'var(--accent)' : 'rgba(232, 182, 116, 0.05)',
                    filter: scrollMode === 'manual' ? 'brightness(1.08)' : 'none',
                  },
                }}
              >
                Load more movies
              </Button>
              {scrollMode === 'infinite' && (
                <Typography sx={{ fontSize: '12px', color: 'var(--subtle)' }}>
                  Auto-scrolling enabled (switch to "Click to load" to inspect footer links)
                </Typography>
              )}
            </Box>
          )}
          {hasMore && loadingSearch && <div ref={sentinel} />}
        </section>
      </div>
    </main>
  );
}
