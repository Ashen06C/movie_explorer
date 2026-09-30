import { Box, Typography } from '@mui/material';
import { useMovies } from '../context/MovieContext';

export default function HomePage() {
  const { username } = useMovies();
  return (
    <main className="page-container">
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Welcome to Movie Explorer, {username}!
        </Typography>
        <Typography sx={{ color: 'var(--muted)' }}>
          Trending movies and search feed will load here.
        </Typography>
      </Box>
    </main>
  );
}
