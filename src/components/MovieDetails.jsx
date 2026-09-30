import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Rating,
  Snackbar,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { backdropUrl, posterUrl } from '../api/tmdb';
import MovieCast from './MovieCast';
import MovieTrailer from './MovieTrailer';

export default function MovieDetails({ movie, saved, onToggleFavorite }) {
  const [shareToast, setShareToast] = useState(false);

  if (!movie) return null;

  const trailer =
    movie?.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
    movie?.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const cast = movie?.credits?.cast?.slice(0, 6) || [];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
    }
  };

  return (
    <div className="details-wrapper">
      <div
        className="details-backdrop"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,11,17,.95), rgba(10,11,17,.32)),linear-gradient(0deg, rgba(10,11,17,1), transparent 62%),url(${backdropUrl(
            movie.backdrop_path
          )})`,
        }}
      />
      <div className="page-container details-container">
        <Link to="/" className="back-link light">
          <ArrowBackRoundedIcon fontSize="small" /> Back to discover
        </Link>

        <div className="details-layout">
          <div className="details-poster">
            {movie.poster_path ? (
              <img src={posterUrl(movie.poster_path)} alt={`${movie.title} poster`} />
            ) : (
              <div className="poster-placeholder">No poster available</div>
            )}
          </div>

          <div className="details-copy">
            <div className="eyebrow light-eyebrow">
              <span className="eyebrow-dot" /> A STORY WORTH EXPLORING
            </div>
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="movie-tagline">“{movie.tagline}”</p>}

            {/* Movie metadata */}
            <div className="details-meta">
              <span>
                <CalendarMonthRoundedIcon /> {movie.release_date?.slice(0, 4) || 'Year unknown'}
              </span>
              <span>
                <AccessTimeRoundedIcon />{' '}
                {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'Runtime unavailable'}
              </span>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                <Rating
                  value={Number(movie.vote_average || 0) / 2}
                  precision={0.1}
                  readOnly
                  size="small"
                  emptyIcon={<StarRoundedIcon fontSize="inherit" sx={{ opacity: 0.3, color: '#fff' }} />}
                  sx={{ '& .MuiRating-iconFilled': { color: '#f6bb63' } }}
                />
                <span className="details-rating">
                  {Number(movie.vote_average || 0).toFixed(1)} / 10
                </span>
              </Box>
            </div>

            {/* Genres */}
            <div className="genre-list">
              {movie.genres?.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                    color: '#f0f0f0',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '6px',
                  }}
                />
              ))}
            </div>

            <h2>The story</h2>
            <p className="overview">{movie.overview || 'A description is not available for this movie yet.'}</p>

            <div className="details-actions">
              <Button
                variant="contained"
                onClick={() => onToggleFavorite(movie)}
                startIcon={saved ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
                sx={{
                  bgcolor: 'var(--accent)',
                  color: 'var(--accent-ink)',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: 'var(--accent)', filter: 'brightness(1.1)' },
                }}
              >
                {saved ? 'Saved to watchlist' : 'Add to watchlist'}
              </Button>

              <Button
                variant="outlined"
                onClick={handleShare}
                startIcon={<ShareRoundedIcon />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  px: 2,
                  py: 1.2,
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                Share
              </Button>

              {trailer && (
                <a className="trailer-link" href="#trailer">
                  <PlayArrowRoundedIcon /> Watch trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modular Cast Component */}
        <MovieCast cast={cast} />

        {/* Modular Trailer Component */}
        <MovieTrailer trailer={trailer} title={movie.title} />
      </div>

      {/* Share Toast */}
      <Snackbar
        open={shareToast}
        autoHideDuration={3000}
        onClose={() => setShareToast(false)}
        message="Movie link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--line)',
            fontSize: '13.5px',
            fontWeight: 600,
          },
        }}
      />
    </div>
  );
}
