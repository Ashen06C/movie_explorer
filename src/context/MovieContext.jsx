import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MovieContext = createContext(null);

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readStored('movieExplorer.favorites', []));
  const [lastSearch, setLastSearch] = useState(() => readStored('movieExplorer.lastSearch', ''));
  const [mode, setMode] = useState(() => readStored('movieExplorer.mode', 'dark'));
  const [username, setUsername] = useState(() => sessionStorage.getItem('movieExplorer.username') || '');

  const toggleFavorite = useCallback((movie) => {
    setFavorites((current) => {
      const next = current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie];
      localStorage.setItem('movieExplorer.favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const saveSearch = useCallback((query) => {
    setLastSearch(query);
    localStorage.setItem('movieExplorer.lastSearch', JSON.stringify(query));
  }, []);

  const toggleMode = useCallback(() => {
    setMode((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('movieExplorer.mode', JSON.stringify(next));
      return next;
    });
  }, []);

  const login = useCallback((name) => {
    const trimmed = name.trim();
    sessionStorage.setItem('movieExplorer.username', trimmed);
    setUsername(trimmed);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('movieExplorer.username');
    setUsername('');
  }, []);

  const value = useMemo(() => ({
    favorites, toggleFavorite, lastSearch, saveSearch, mode, toggleMode, username, login, logout,
  }), [favorites, toggleFavorite, lastSearch, saveSearch, mode, toggleMode, username, login, logout]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export const useMovies = () => useContext(MovieContext);
