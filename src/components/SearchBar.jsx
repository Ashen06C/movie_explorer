import { Button, IconButton, InputBase, Paper } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <Paper
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      role="search"
      elevation={0}
      className="search-bar-paper"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5 },
        minHeight: { xs: 56, sm: 64 },
        borderRadius: '12px',
        border: '1px solid var(--line)',
        backgroundColor: 'var(--surface)',
        padding: { xs: '6px 6px 6px 16px', sm: '8px 8px 8px 22px' },
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:focus-within': {
          borderColor: 'var(--accent)',
          boxShadow: '0 12px 32px rgba(232, 182, 116, 0.15)',
        },
      }}
    >
      <SearchRoundedIcon
        sx={{
          color: 'var(--accent)',
          fontSize: { xs: 22, sm: 26 },
          flexShrink: 0,
        }}
      />
      <InputBase
        fullWidth
        aria-label="Search movies"
        placeholder="Search movies, stories, and titles..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          color: 'var(--text)',
          fontSize: { xs: '15px', sm: '16px' },
          fontFamily: 'inherit',
          '& input': {
            padding: 0,
          },
          '& input::placeholder': {
            color: 'var(--subtle)',
            opacity: 1,
          },
        }}
      />
      {value && (
        <IconButton
          aria-label="Clear search"
          onClick={() => onChange('')}
          size="small"
          sx={{ color: 'var(--muted)', '&:hover': { color: 'var(--text)' } }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      )}
      <Button
        type="submit"
        variant="contained"
        endIcon={<ArrowOutwardRoundedIcon />}
        sx={{
          bgcolor: 'var(--accent)',
          color: 'var(--accent-ink)',
          fontWeight: 700,
          fontSize: { xs: '13px', sm: '14px' },
          textTransform: 'none',
          borderRadius: '8px',
          padding: { xs: '8px 16px', sm: '10px 24px' },
          boxShadow: 'none',
          whiteSpace: 'nowrap',
          '&:hover': {
            bgcolor: 'var(--accent)',
            filter: 'brightness(1.08)',
            boxShadow: '0 4px 14px rgba(232, 182, 116, 0.3)',
          },
        }}
      >
        Search
      </Button>
    </Paper>
  );
}
