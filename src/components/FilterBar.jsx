import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function FilterBar({
  genre,
  year,
  rating,
  genreOptions = [],
  years = [],
  onGenreChange,
  onYearChange,
  onRatingChange,
  onClear,
}) {
  const hasActiveFilters = Boolean(genre || year || rating);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1.5,
        py: 2.5,
        borderBottom: '1px solid var(--line)',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          color: 'var(--muted)',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '1px',
          mr: 1,
        }}
      >
        <TuneRoundedIcon fontSize="small" sx={{ color: 'var(--accent)' }} /> FILTER BY
      </Box>

      {/* Genre Select */}
      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 } }}>
        <InputLabel id="genre-select-label" sx={{ color: 'var(--subtle)', fontSize: '13px' }}>
          Genre
        </InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={genre}
          label="Genre"
          onChange={(event) => onGenreChange(event.target.value)}
          sx={{
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--line)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
          }}
        >
          {genreOptions.map((option) => (
            <MenuItem key={option.id} value={option.id} sx={{ fontSize: '13px' }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Year Select */}
      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
        <InputLabel id="year-select-label" sx={{ color: 'var(--subtle)', fontSize: '13px' }}>
          Year
        </InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={year}
          label="Year"
          onChange={(event) => onYearChange(event.target.value)}
          sx={{
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--line)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
          }}
        >
          <MenuItem value="" sx={{ fontSize: '13px' }}>
            Any year
          </MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y} sx={{ fontSize: '13px' }}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Select */}
      <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 130 } }}>
        <InputLabel id="rating-select-label" sx={{ color: 'var(--subtle)', fontSize: '13px' }}>
          Rating
        </InputLabel>
        <Select
          labelId="rating-select-label"
          id="rating-select"
          value={rating}
          label="Rating"
          onChange={(event) => onRatingChange(event.target.value)}
          sx={{
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--line)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
          }}
        >
          <MenuItem value="" sx={{ fontSize: '13px' }}>
            Any rating
          </MenuItem>
          <MenuItem value="7" sx={{ fontSize: '13px' }}>
            ★ 7.0+ stars
          </MenuItem>
          <MenuItem value="8" sx={{ fontSize: '13px' }}>
            ★ 8.0+ stars
          </MenuItem>
          <MenuItem value="9" sx={{ fontSize: '13px' }}>
            ★ 9.0+ stars
          </MenuItem>
        </Select>
      </FormControl>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<ClearRoundedIcon />}
          onClick={onClear}
          sx={{
            color: 'var(--accent)',
            borderColor: 'var(--accent)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'rgba(232, 182, 116, 0.1)',
              borderColor: 'var(--accent)',
            },
          }}
        >
          Clear filters
        </Button>
      )}
    </Box>
  );
}
