import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useNowPlaying, usePopular } from '../hooks/useMovies';
import { MovieCard } from '../components/movie/MovieCard';
import { MovieGridSkeleton } from '../components/ui/MovieGridSkeleton';
import { ErrorState } from '../components/ui/States';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useState } from 'react';

export function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const nowPlaying = useNowPlaying();
  const popular = usePopular();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <form onSubmit={handleSearch} className="flex gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-muted)' }}
            />
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search movies..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-border)')}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)', color: 'white' }}
          >
            <Filter size={14} />
            Filters
          </button>
        </form>
      </div>

      <div className="mb-2">
        <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>
          Discover Movies
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Find and explore your next favourite movie.
        </p>
      </div>

      <section className="mt-8">
        <SectionHeader title="Now Playing" viewAllTo="/search?cat=now_playing" />
        {nowPlaying.isError ? (
          <ErrorState />
        ) : nowPlaying.isLoading ? (
          <MovieGridSkeleton count={5} />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {nowPlaying.data?.results.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <SectionHeader title="Popular Movies" viewAllTo="/popular" />
        {popular.isError ? (
          <ErrorState />
        ) : popular.isLoading ? (
          <MovieGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popular.data?.results.slice(0, 6).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
