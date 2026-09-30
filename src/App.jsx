import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { MovieProvider, useMovies } from './context/MovieContext';
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';

function ProtectedLayout() {
  const { username } = useMovies();
  if (!username) return <Navigate to="/login" replace />;
  return <><AppHeader /><Outlet /><footer className="site-footer"><div className="page-container"><span>© {new Date().getFullYear()} Movie Explorer. Made for movie lovers.</span><span className="tmdb-credit"><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" aria-label="The Movie Database"><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDb logo" /></a><span>Credits: movie data and images from <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDb</a>.<br /></span></span></div></footer></>;
}
function AppContent() {
  const { mode } = useMovies();
  const theme = useMemo(() => createTheme({
    palette: { mode, primary: { main: '#e8b674' }, background: { default: mode === 'dark' ? '#101116' : '#f6f3ee', paper: mode === 'dark' ? '#1d1e25' : '#ffffff' } },
    typography: { fontFamily: 'Inter, Arial, sans-serif', button: { textTransform: 'none', fontWeight: 700 } },
    shape: { borderRadius: 12 },
  }), [mode]);

  return <ThemeProvider theme={theme}><CssBaseline /><div className={`app-shell theme-${mode}`}><BrowserRouter><Routes><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedLayout />}><Route path="/" element={<HomePage />} /><Route path="/movie/:id" element={<MovieDetailsPage />} /><Route path="/favorites" element={<FavoritesPage />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter></div></ThemeProvider>;
}

export default function App() {
  return <MovieProvider><AppContent /></MovieProvider>;
}
