import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Clock, Globe } from 'lucide-react';
import { useMovieDetails, useSimilarMovies } from '../hooks/useMovies';
import { backdropUrl, posterUrl } from '../api/tmdb';
import { MovieCard } from '../components/movie/MovieCard';
import { MovieGridSkeleton } from '../components/ui/MovieGridSkeleton';
import { ErrorState } from '../components/ui/States';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useState } from 'react';

function formatMoney(n: number) {
  return n > 0 ? `$${n.toLocaleString()}` : 'N/A';
}

function formatRuntime(mins?: number) {
  if (!mins) return 'N/A';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);
  const [favorited, setFavorited] = useState(false);

  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const { data: similar } = useSimilarMovies(movieId);

  if (isLoading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-8 w-20 rounded mb-6" style={{ background: 'var(--color-surface-2)' }} />
        <div
          className="w-full h-64 rounded-2xl mb-8"
          style={{ background: 'var(--color-surface-2)' }}
        />
        <MovieGridSkeleton count={5} />
      </div>
    );
  }

  if (isError || !movie) return <ErrorState message="Could not load movie details." />;

  const director = movie.credits?.crew.find(c => c.job === 'Director');
  const topCast = movie.credits?.cast.slice(0, 4).map(c => c.name).join(', ');
  const backdrop = backdropUrl(movie.backdrop_path);

  const metaItems = [
    { label: 'Release Date', value: movie.release_date ?? 'N/A' },
    { label: 'Director', value: director?.name ?? 'N/A' },
    { label: 'Cast', value: topCast ?? 'N/A' },
    { label: 'Language', value: movie.original_language?.toUpperCase() ?? 'N/A' },
    { label: 'Budget', value: formatMoney(movie.budget ?? 0) },
    { label: 'Revenue', value: formatMoney(movie.revenue ?? 0) },
  ];

  return (
    <div>
      {backdrop && (
        <div className="relative w-full h-56 overflow-hidden">
          <img src={backdrop} alt="" className="w-full h-full object-cover object-top" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(13,15,20,0.4) 0%, rgba(13,15,20,1) 100%)',
            }}
          />
        </div>
      )}

      <div className="px-6 pb-8" style={{ marginTop: backdrop ? '-4rem' : '1.5rem' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-muted)' }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex gap-6 mb-8">
          <div className="flex-shrink-0 w-36 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={posterUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pt-2">
            <h1
              className="font-display font-bold text-2xl leading-tight"
              style={{ color: 'var(--color-text)' }}
            >
              {movie.title}
            </h1>

            <div
              className="flex items-center gap-3 mt-2 text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              {movie.release_date && <span>{movie.release_date.split('-')[0]}</span>}
              {movie.runtime && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {formatRuntime(movie.runtime)}
                  </span>
                </>
              )}
              {movie.original_language && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 uppercase">
                    <Globe size={12} />
                    {movie.original_language}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Star size={16} fill="#f5c518" color="#f5c518" />
                <span className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>

              <button
                onClick={() => setFavorited(f => !f)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: favorited ? '#ef4444' : 'var(--color-surface)',
                  border: `1px solid ${favorited ? '#ef4444' : 'var(--color-border)'}`,
                  color: favorited ? 'white' : 'var(--color-muted)',
                }}
              >
                <Heart size={14} fill={favorited ? 'white' : 'none'} />
                {favorited ? 'Saved' : 'Add to Favorites'}
              </button>
            </div>

            {movie.tagline && (
              <p
                className="mt-3 text-sm italic"
                style={{ color: 'var(--color-muted)' }}
              >
                "{movie.tagline}"
              </p>
            )}
          </div>
        </div>

        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <h2
            className="font-display font-semibold text-sm mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            Overview
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {movie.overview || 'No overview available.'}
          </p>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-4">
              <h3
                className="font-display font-semibold text-sm mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(g => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-y-3 gap-x-6">
            {metaItems.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                  {label}
                </dt>
                <dd className="text-sm mt-0.5 truncate" style={{ color: 'var(--color-text)' }}>
                  {value}
                </dd>
              </div>
            ))}
          </div>
        </div>

        {similar?.results && similar.results.length > 0 && (
          <section>
            <SectionHeader title="Similar Movies" />
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {similar.results.slice(0, 5).map(m => (
                <MovieCard key={m.id} movie={m} size="sm" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
