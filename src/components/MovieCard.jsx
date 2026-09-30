import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import { posterUrl } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie, index = 0 }) {
  const { favorites, toggleFavorite } = useMovies();
  const saved = favorites.some((item) => item.id === movie.id);
  const year = movie.release_date?.slice(0, 4) || 'Year unknown';

  return (
    <article className="movie-card" style={{ '--card-index': Math.min(index, 8) }}>
      <Link to={`/movie/${movie.id}`} className="movie-card-link" aria-label={`View details for ${movie.title}`}>
        <div className="poster-wrap">
          {movie.poster_path ? (
            <img className="movie-poster" src={posterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy" />
          ) : (
            <div className="poster-placeholder"><BrokenImageOutlinedIcon /><span>No poster available</span></div>
          )}
          <span className="poster-gradient" />
          <span className="rating-pill"><StarRoundedIcon fontSize="inherit" />{Number(movie.vote_average || 0).toFixed(1)}</span>
        </div>
        <div className="movie-card-copy">
          <h3 title={movie.title}>{movie.title}</h3>
          <p>{year} <span>•</span> Movie</p>
        </div>
      </Link>
      <Tooltip title={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
        <IconButton
          className={`card-favorite ${saved ? 'is-saved' : ''}`}
          onClick={() => toggleFavorite(movie)}
          aria-label={`${saved ? 'Remove' : 'Add'} ${movie.title} ${saved ? 'from' : 'to'} watchlist`}
        >
          {saved ? <FavoriteRoundedIcon fontSize="small" /> : <FavoriteBorderRoundedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </article>
  );
}
