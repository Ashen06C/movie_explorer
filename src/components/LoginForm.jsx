import { useState } from 'react';
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function LoginForm({ onSubmit, error, onClearError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  const handleDemoFill = () => {
    setUsername('Alex');
    setPassword('password123');
    onClearError?.();
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
          onClearError?.();
        }}
        placeholder="e.g. Alex"
        fullWidth
        autoComplete="username"
        error={Boolean(error)}
        sx={{
          mb: 2.5,
          '& .MuiInputLabel-root': { color: '#c5c7d2', fontSize: '14px' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent)' },
          '& .MuiOutlinedInput-root': {
            bgcolor: '#1c1d25',
            color: '#ffffff',
            fontSize: '15px',
            borderRadius: '10px',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
            '&:hover fieldset': { borderColor: 'var(--accent)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
          },
          '& input::placeholder': { color: '#828490', opacity: 1 },
        }}
      />

      <TextField
        id="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          onClearError?.();
        }}
        placeholder="At least 4 characters"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        autoComplete="current-password"
        error={Boolean(error)}
        helperText={error}
        sx={{
          mb: 3,
          '& .MuiInputLabel-root': { color: '#c5c7d2', fontSize: '14px' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent)' },
          '& .MuiOutlinedInput-root': {
            bgcolor: '#1c1d25',
            color: '#ffffff',
            fontSize: '15px',
            borderRadius: '10px',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
            '&:hover fieldset': { borderColor: 'var(--accent)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
          },
          '& input::placeholder': { color: '#828490', opacity: 1 },
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              size="small"
              sx={{ color: '#b0b2be' }}
            >
              {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
            </IconButton>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        endIcon={<ArrowForwardRoundedIcon />}
        sx={{
          bgcolor: 'var(--accent)',
          color: 'var(--accent-ink)',
          fontSize: '12px',
          fontWeight: 800,
          py: 1.5,
          borderRadius: '9px',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            bgcolor: 'var(--accent)',
            filter: 'brightness(1.08)',
            boxShadow: '0 6px 18px rgba(232, 182, 116, 0.35)',
          },
        }}
      >
        Enter Movie Explorer
      </Button>

      <Divider sx={{ my: 2.5, borderColor: 'rgba(255, 255, 255, 0.15)', fontSize: '12px', color: '#a0a2af' }}>
        OR
      </Divider>

      {/* Quick Demo Fill Button */}
      <Button
        type="button"
        variant="outlined"
        fullWidth
        startIcon={<AccountCircleRoundedIcon />}
        onClick={handleDemoFill}
        sx={{
          borderColor: 'rgba(255, 255, 255, 0.25)',
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          color: '#ffffff',
          fontSize: '13.5px',
          fontWeight: 700,
          py: 1.25,
          borderRadius: '9px',
          textTransform: 'none',
          '&:hover': {
            borderColor: 'var(--accent)',
            color: 'var(--accent)',
            bgcolor: 'rgba(232, 182, 116, 0.1)',
          },
        }}
      >
        Fill Demo Account (Alex)
      </Button>

      <Typography sx={{ color: 'var(--muted)', fontSize: '10px', lineHeight: 1.6, mt: 2.5 }}>
        Demo sign-in: choose any username and password. Your password is never saved.
      </Typography>
    </form>
  );
}
