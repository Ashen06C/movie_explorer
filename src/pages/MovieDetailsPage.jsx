import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { friendlyApiError, getMovieDetails, hasTmdbCredentials } from '../api/tmdb';
import { demoMovieById } from '../data/demoMovies';
import { useMovies } from '../context/MovieContext';
import MovieDetails from '../components/MovieDetails';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useMovies();
  const [movie, setMovie] = useState(() => (hasTmdbCredentials ? null : demoMovieById(id)));
  const [loading, setLoading] = useState(hasTmdbCredentials);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!hasTmdbCredentials) {
      setMovie(demoMovieById(id));
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    getMovieDetails(id, controller.signal)
      .then(setMovie)
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(friendlyApiError(requestError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id, retry]);

  const saved = Boolean(movie && favorites.some((item) => item.id === movie.id));

  if (loading)
    return (
      <main className="page-container detail-loading">
        <CircularProgress sx={{ color: 'var(--accent)' }} />
        <Typography sx={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 600 }}>
          Rolling the credits...
        </Typography>
      </main>
    );

  if (error)
    return (
      <main className="page-container detail-error">
        <Link to="/" className="back-link">
          <ArrowBackRoundedIcon fontSize="small" /> Back to discover
        </Link>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => setRetry((value) => value + 1)}>
              Retry
            </Button>
          }
          sx={{ fontSize: '14px', borderRadius: '10px' }}
        >
          {error}
        </Alert>
      </main>
    );

  if (!movie)
    return (
      <main className="page-container detail-error">
        <Link to="/" className="back-link">
          <ArrowBackRoundedIcon fontSize="small" /> Back to discover
        </Link>
        <h1>Movie not found</h1>
        <p>This movie is not in the preview collection.</p>
      </main>
    );

  return (
    <main className="details-page">
      <MovieDetails movie={movie} saved={saved} onToggleFavorite={toggleFavorite} />
    </main>
  );
}
