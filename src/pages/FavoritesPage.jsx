import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../context/MovieContext';

export default function FavoritesPage() {
  const { favorites } = useMovies();
  return (
    <main className="page-container favorites-page">
      <Link to="/" className="back-link"><ArrowBackRoundedIcon fontSize="small" /> Back to discover</Link>
      <div className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL COLLECTION</div>
      <div className="favorites-heading"><div><h1>My <em>watchlist.</em></h1><p>The movies you saved for later. Good stories are worth keeping.</p></div><span>{favorites.length.toString().padStart(2, '0')} SAVED FILMS</span></div>
      {favorites.length ? <MovieGrid movies={favorites} /> : <div className="empty-state favorites-empty"><FavoriteRoundedIcon /><h3>Your watchlist is waiting</h3><p>Tap the heart on any movie to save it here for later.</p><Button component={Link} to="/" variant="contained">Explore movies</Button></div>}
    </main>
  );
}
