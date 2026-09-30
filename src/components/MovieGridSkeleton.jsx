import { Box, Skeleton } from '@mui/material';

export default function MovieGridSkeleton({ count = 10 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
        gap: { xs: 2, sm: 2.5, md: 3 },
        my: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i}>
          <Skeleton
            variant="rounded"
            sx={{
              aspectRatio: '2/3',
              width: '100%',
              height: 'auto',
              bgcolor: 'var(--surface-soft)',
              borderRadius: '10px',
            }}
          />
          <Skeleton width="85%" height={24} sx={{ bgcolor: 'var(--surface-soft)', mt: 1.5 }} />
          <Skeleton width="45%" height={20} sx={{ bgcolor: 'var(--surface-soft)' }} />
        </Box>
      ))}
    </Box>
  );
}
