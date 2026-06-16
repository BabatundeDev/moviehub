import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import { useSearchMovies, useGenres } from '../hooks/useMovies';
import { useDebounce } from '../hooks/useDebounce';
import { MovieCard } from '../components/movie/MovieCard';
import { MovieGridSkeleton } from '../components/ui/MovieGridSkeleton';
import { ErrorState, EmptyState } from '../components/ui/States';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'release_date.desc', label: 'Newest' },
  { value: 'revenue.desc', label: 'Revenue' },
];

const RATING_OPTIONS = ['', '5', '6', '7', '8'];
const YEAR_OPTIONS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980'];

export function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [genreId, setGenreId] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const debouncedQuery = useDebounce(query, 400);
  const { data: genresData } = useGenres();

  const { data, isLoading, isError } = useSearchMovies(debouncedQuery, {
    genreId,
    year,
    rating,
    sortBy,
  });

  useEffect(() => {
    const q = params.get('q');
    if (q) setQuery(q);
  }, [params]);

  const hasFilters = genreId || year || rating || sortBy !== 'popularity.desc';

  const clearFilters = () => {
    setGenreId('');
    setYear('');
    setRating('');
    setSortBy('popularity.desc');
  };

  const selectStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.8125rem',
    outline: 'none',
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6 max-w-2xl">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-muted)' }}
          />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={13} style={{ color: 'var(--color-muted)' }} />
            </button>
          )}
        </div>
      </div>

      {query && (
        <p className="text-sm mb-4 font-medium" style={{ color: 'var(--color-text)' }}>
          Search Results for{' '}
          <span style={{ color: 'var(--color-accent)' }}>"{debouncedQuery}"</span>
          {data && (
            <span className="ml-2 font-normal" style={{ color: 'var(--color-muted)' }}>
              {data.total_results.toLocaleString()} results
            </span>
          )}
        </p>
      )}

      <div
        className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-xl"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-2">
          <Filter size={13} style={{ color: 'var(--color-muted)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
            Filters
          </span>
        </div>

        <select value={genreId} onChange={e => setGenreId(e.target.value)} style={selectStyle}>
          <option value="">All Genres</option>
          {genresData?.genres.map(g => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select value={year} onChange={e => setYear(e.target.value)} style={selectStyle}>
          <option value="">All Years</option>
          {YEAR_OPTIONS.filter(Boolean).map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={rating} onChange={e => setRating(e.target.value)} style={selectStyle}>
          <option value="">All Ratings</option>
          {RATING_OPTIONS.filter(Boolean).map(r => (
            <option key={r} value={r}>
              {r}+ Stars
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: 'var(--color-accent)' }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {isError ? (
        <ErrorState />
      ) : isLoading ? (
        <MovieGridSkeleton count={12} />
      ) : !data?.results.length ? (
        <EmptyState message="No movies match your search. Try different filters." />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
