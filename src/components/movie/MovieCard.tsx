import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { posterUrl } from '../../api/tmdb';

interface Props {
  movie: Movie;
  size?: 'sm' | 'md';
}

export function MovieCard({ movie, size = 'md' }: Props) {
  const year = movie.release_date?.split('-')[0] ?? '';
  const rating = movie.vote_average?.toFixed(1);

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div
        className="relative rounded-xl overflow-hidden transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-2xl"
        style={{ aspectRatio: '2/3', background: 'var(--color-surface-2)' }}
      >
        {movie.poster_path ? (
          <img
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span style={{ color: 'var(--color-muted)' }} className="text-xs text-center px-2">
              No Image
            </span>
          </div>
        )}

        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-semibold"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        >
          <Star size={10} fill="#f5c518" color="#f5c518" />
          <span style={{ color: '#f5c518' }}>{rating}</span>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
        />
      </div>

      <div className="mt-2 px-0.5">
        <p
          className={`font-medium leading-tight line-clamp-2 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}
          style={{ color: 'var(--color-text)' }}
        >
          {movie.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
          {year}
        </p>
      </div>
    </Link>
  );
}
