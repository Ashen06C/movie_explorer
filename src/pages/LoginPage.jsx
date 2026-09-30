import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Brand from '../components/Brand';
import LoginForm from '../components/LoginForm';
import { useMovies } from '../context/MovieContext';
import { backdropUrl } from '../api/tmdb';
import { demoMovies } from '../data/demoMovies';

export default function LoginPage() {
  const { username: signedIn, login } = useMovies();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (signedIn) return <Navigate to="/" replace />;

  const handleLogin = (username, password) => {
    if (username.trim().length < 2 || password.length < 4) {
      setError('Enter a username of at least 2 characters and a password of at least 4 characters.');
      return;
    }
    login(username);
    navigate('/', { replace: true });
  };

  return (
    <main className="login-page">
      <div
        className="login-art"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(12,12,18,.54),rgba(12,12,18,.07)),url(${backdropUrl(
            demoMovies[0].backdrop_path
          )})`,
        }}
      >
        <div className="login-art-content">
          <div className="eyebrow light-eyebrow">
            <span className="eyebrow-dot" /> YOUR NEXT FAVORITE AWAITS
          </div>
          <h2>
            A whole world<br />
            of <em>stories.</em>
          </h2>
          <p>Discover the films everyone is talking about, and keep the ones you love close.</p>
          <div className="login-art-meta">
            <span>01 / 03</span>
            <span className="art-line" />
            <span>EXPLORE MORE</span>
          </div>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-top">
          <Brand compact />
          <Typography
            component="span"
            sx={{
              color: 'var(--subtle)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1.8px',
            }}
          >
            DISCOVER. SAVE. REPEAT.
          </Typography>
        </div>

        <div className="login-form-wrap">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> WELCOME BACK
          </div>
          <h1>
            Sign in to start<br />
            <em>exploring.</em>
          </h1>
          <p className="login-subtitle">Your personal space for all things cinema.</p>

          {/* Modular LoginForm Component */}
          <LoginForm
            onSubmit={handleLogin}
            error={error}
            onClearError={() => setError('')}
          />
        </div>

        <Box
          sx={{
            borderTop: '1px solid var(--line)',
            pt: 2.5,
            color: 'var(--subtle)',
            fontSize: '11px',
            letterSpacing: '1.5px',
            fontWeight: 800,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>A NEW WAY TO FIND WHAT MOVES YOU</span>
          <span style={{ color: 'var(--accent)' }}>✦</span>
        </Box>
      </div>
    </main>
  );
}
