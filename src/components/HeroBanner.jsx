import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { backdropUrl } from '../api/tmdb';

export default function HeroBanner({
  featured,
  spotlightList = [],
  spotlightIndex = 0,
  onPrev,
  onNext,
}) {
  if (!featured) return null;

  return (
    <section
      className="hero"
      aria-label="Featured movie"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(11,12,18,.98) 5%, rgba(11,12,18,.86) 42%, rgba(11,12,18,.15) 100%),url(${backdropUrl(
          featured?.backdrop_path
        )})`,
      }}
    >
      <div className="hero-content">
        <div className="hero-kicker">
          <span className="eyebrow-dot" /> THIS WEEK'S SPOTLIGHT
        </div>
        <h1>
          Find a film<br />
          that <em>stays with you.</em>
        </h1>
        <p>Escape the ordinary. Explore stories worth sharing, scenes worth replaying, and movies made to move you.</p>
        <div className="hero-actions">
          <Button
            component={Link}
            to={`/movie/${featured?.id}`}
            variant="contained"
            startIcon={<PlayArrowRoundedIcon />}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              bgcolor: 'var(--accent)',
              color: 'var(--accent-ink)',
              fontWeight: 800,
              fontSize: '13px',
              borderRadius: '8px',
              px: 2.5,
              py: 1.25,
              '&:hover': { bgcolor: 'var(--accent)', filter: 'brightness(1.1)' },
            }}
          >
            Explore featured
          </Button>
          <Button
            href="#discover"
            variant="text"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              '&:hover': { color: 'var(--accent)', textDecoration: 'underline' },
            }}
          >
            Browse movies ↘
          </Button>
        </div>
      </div>

      {/* Featured film metadata label */}
      <div className="hero-film-label">
        <span>FEATURED FILM</span>
        <strong>{featured?.title}</strong>
        <span>
          {featured?.release_date?.slice(0, 4)} · {Number(featured?.vote_average || 0).toFixed(1)} / 10
        </span>
      </div>

      {/* Interactive Spotlight Carousel controls - perfectly aligned horizontal pill */}
      {spotlightList.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 18, sm: 26 },
            right: { xs: 18, sm: 30 },
            zIndex: 3,
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            bgcolor: 'rgba(15, 16, 22, 0.82)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            px: 1,
            py: 0.5,
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)',
          }}
        >
          <IconButton
            size="small"
            onClick={onPrev}
            aria-label="Previous spotlight film"
            sx={{
              color: '#ffffff',
              width: 28,
              height: 28,
              p: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                color: 'var(--accent)',
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 12 }} />
          </IconButton>

          <Typography
            component="span"
            sx={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#ffffff',
              px: 1.2,
              letterSpacing: '1px',
              userSelect: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              lineHeight: 1,
            }}
          >
            <span>0{spotlightIndex + 1}</span>
            <span style={{ color: 'var(--muted)', opacity: 0.65, margin: '0 2px' }}>/</span>
            <span>0{spotlightList.length}</span>
          </Typography>

          <IconButton
            size="small"
            onClick={onNext}
            aria-label="Next spotlight film"
            sx={{
              color: '#ffffff',
              width: 28,
              height: 28,
              p: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                color: 'var(--accent)',
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </Box>
      )}
    </section>
  );
}
