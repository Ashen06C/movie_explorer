import { Link, useParams } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MovieDetailsPage() {
  const { id } = useParams();
  return (
    <main className="page-container" style={{ padding: '40px 0' }}>
      <Link to="/" className="back-link">
        <ArrowBackRoundedIcon fontSize="small" /> Back to discover
      </Link>
      <h1>Movie Details ({id})</h1>
      <p>Movie details will be displayed here.</p>
    </main>
  );
}
