import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
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

      {/* Interactive Spotlight Carousel controls */}
      {spotlightList.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            right: 28,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgba(15, 16, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            px: 1.5,
            py: 0.5,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Button
            size="small"
            onClick={onPrev}
            aria-label="Previous spotlight film"
            sx={{ minWidth: 26, width: 26, height: 26, p: 0, color: '#fff', '&:hover': { color: 'var(--accent)' } }}
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 11 }} />
          </Button>
          <Typography sx={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
            0{spotlightIndex + 1} <span style={{ color: 'var(--muted)' }}>/</span> 0{spotlightList.length}
          </Typography>
          <Button
            size="small"
            onClick={onNext}
            aria-label="Next spotlight film"
            sx={{ minWidth: 26, width: 26, height: 26, p: 0, color: '#fff', '&:hover': { color: 'var(--accent)' } }}
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 11 }} />
          </Button>
        </Box>
      )}
    </section>
  );
}
