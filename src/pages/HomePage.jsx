import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../context/MovieContext';
import { friendlyApiError, getTrending, hasTmdbCredentials } from '../api/tmdb';
import { demoMovies } from '../data/demoMovies';

export default function HomePage() {
  const { username } = useMovies();
  const [trending, setTrending] = useState(hasTmdbCredentials ? [] : demoMovies);
  const [loading, setLoading] = useState(hasTmdbCredentials);
  const [error, setError] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    if (!hasTmdbCredentials) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    getTrending(controller.signal)
      .then(setTrending)
      .catch((err) => {
        if (!controller.signal.aborted) setError(friendlyApiError(err));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const spotlightList = trending.slice(0, 3);
  const featured = spotlightList[spotlightIndex] || trending[0] || demoMovies[0];

  return (
    <main>
      <div className="page-container">
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

        <HeroBanner
          featured={featured}
          spotlightList={spotlightList}
          spotlightIndex={spotlightIndex}
          onPrev={() => setSpotlightIndex((i) => (i === 0 ? spotlightList.length - 1 : i - 1))}
          onNext={() => setSpotlightIndex((i) => (i >= spotlightList.length - 1 ? 0 : i + 1))}
        />

        <section className="results-section" style={{ paddingTop: '40px' }}>
          <div className="results-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> CURATED FOR YOU
              </div>
              <h2>
                Trending <em>right now.</em>
              </h2>
            </div>
            <Typography sx={{ color: 'var(--subtle)', fontSize: '12px', fontWeight: 800 }}>
              {trending.length} FILMS TO EXPLORE
            </Typography>
          </div>

          {!hasTmdbCredentials && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Preview mode: add a TMDb credential in <code>.env</code> for live trending movies.
            </Alert>
          )}

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: 'var(--accent)' }} />
            </Box>
          ) : (
            <MovieGrid movies={trending} />
          )}
        </section>
      </div>
    </main>
  );
}
