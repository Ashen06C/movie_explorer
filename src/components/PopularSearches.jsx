import { Box, Chip, Typography } from '@mui/material';

export default function PopularSearches({ searches = [], activeSearch = '', onSelect }) {
  if (!searches.length) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 2, mb: 1 }}>
      <Typography sx={{ color: 'var(--subtle)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.8px', mr: 0.5 }}>
        POPULAR:
      </Typography>
      {searches.map((term) => {
        const isSelected = activeSearch.toLowerCase() === term.toLowerCase();
        return (
          <Chip
            key={term}
            label={term}
            size="small"
            clickable
            onClick={() => onSelect(term)}
            sx={{
              bgcolor: isSelected ? 'var(--accent)' : 'var(--surface)',
              color: isSelected ? 'var(--accent-ink)' : 'var(--text)',
              border: '1px solid var(--line)',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'var(--surface-soft)',
                borderColor: 'var(--accent)',
              },
            }}
          />
        );
      })}
    </Box>
  );
}
