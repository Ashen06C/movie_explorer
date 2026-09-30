import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function FavoritesPage() {
  return (
    <main className="page-container" style={{ padding: '40px 0' }}>
      <Link to="/" className="back-link">
        <ArrowBackRoundedIcon fontSize="small" /> Back to discover
      </Link>
      <h1>My Watchlist</h1>
      <p>Your saved favorites list will appear here.</p>
    </main>
  );
}
