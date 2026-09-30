import axios from 'axios';

export const hasTmdbCredentials = Boolean(process.env.REACT_APP_TMDB_API_KEY);

const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 12000,
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}` }
});

client.interceptors.request.use((config) => {
  if (process.env.REACT_APP_TMDB_API_KEY) {
    config.params = { ...config.params, api_key: process.env.REACT_APP_TMDB_API_KEY };
  }
  return config;
});

export const posterUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const backdropUrl = (path) => posterUrl(path, 'original');

export async function getTrending(signal) {
  const { data } = await client.get('/trending/movie/week', {
    signal,
    params: { language: 'en-US' },
  });
  return data.results || [];
}

export async function searchMovies(query, page = 1, signal) {
  const { data } = await client.get('/search/movie', {
    signal,
    params: { query, page, include_adult: false, language: 'en-US' },
  });
  return data;
}

export async function getMovieDetails(id, signal) {
  const { data } = await client.get(`/movie/${id}`, {
    signal,
    params: { append_to_response: 'credits,videos', language: 'en-US' },
  });
  return data;
}

export function friendlyApiError(error) {
  if (error?.response?.status === 401) return 'TMDb rejected the API credential. Check your .env settings and try again.';
  if (error?.response?.status === 404) return 'We could not find that movie. Try another title.';
  if (error?.response?.status === 429) return 'Too many requests right now. Please wait a moment and try again.';
  if (!error?.response) return 'We could not connect to TMDb. Check your connection and try again.';
  return 'Something went wrong while loading movies. Please try again.';
}
