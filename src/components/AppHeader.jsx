import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Brand from './Brand';
import { useMovies } from '../context/MovieContext';

export default function AppHeader() {
  const { favorites, mode, toggleMode, username, logout } = useMovies();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink end to="/">Discover</NavLink>
          <NavLink to="/favorites">My watchlist</NavLink>
        </nav>
        <div className="header-actions">
          <NavLink to="/favorites" className="mobile-favorites" aria-label={`Watchlist with ${favorites.length} ${favorites.length === 1 ? 'movie' : 'movies'}`}>
            <FavoriteBorderRoundedIcon fontSize="small" />
            {favorites.length > 0 && <span className="favorite-count">{favorites.length}</span>}
          </NavLink>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton aria-label="Toggle color mode" onClick={toggleMode} className="header-icon">
              {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <span className="header-divider" />
          <Avatar className="user-avatar" aria-label={`Signed in as ${username}`}>{username.charAt(0).toUpperCase()}</Avatar>
          <span className="header-username">{username}</span>
          <Tooltip title="Sign out">
            <IconButton aria-label="Sign out" onClick={handleLogout} className="header-icon logout-button"><LogoutRoundedIcon fontSize="small" /></IconButton>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
