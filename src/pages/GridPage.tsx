import { usePopular, useTopRated, useUpcoming } from '../hooks/useMovies';
import { MovieCard } from '../components/movie/MovieCard';
import { MovieGridSkeleton } from '../components/ui/MovieGridSkeleton';
import { ErrorState } from '../components/ui/States';

interface Props {
  type: 'popular' | 'top-rated' | 'upcoming';
}

const META = {
  popular: { title: 'Popular Movies', subtitle: 'The most watched films right now.' },
  'top-rated': { title: 'Top Rated', subtitle: 'The highest rated films of all time.' },
  upcoming: { title: 'Upcoming', subtitle: 'Films coming to theatres soon.' },
};

export function GridPage({ type }: Props) {
  const popular = usePopular();
  const topRated = useTopRated();
  const upcoming = useUpcoming();

  const query = type === 'popular' ? popular : type === 'top-rated' ? topRated : upcoming;
  const { title, subtitle } = META[type];

  return (
    <div className="p-6">
      <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>
        {title}
      </h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--color-muted)' }}>
        {subtitle}
      </p>

      {query.isError ? (
        <ErrorState />
      ) : query.isLoading ? (
        <MovieGridSkeleton count={20} />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {query.data?.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
