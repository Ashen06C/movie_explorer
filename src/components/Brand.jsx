import { Link } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

export default function Brand({ compact = false }) {
  return (
    <Link to="/" className={`brand ${compact ? 'brand-compact' : ''}`} aria-label="Movie Explorer home">
      <span className="brand-mark"><MovieFilterIcon fontSize="small" /></span>
      <span className="brand-name">movie<span>explorer</span><i>.</i></span>
    </Link>
  );
}
