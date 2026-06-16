import { useQuery } from '@tanstack/react-query';
import { moviesApi } from '../api/tmdb';

export const useNowPlaying = () =>
  useQuery({ queryKey: ['movies', 'now-playing'], queryFn: () => moviesApi.getNowPlaying() });

export const usePopular = () =>
  useQuery({ queryKey: ['movies', 'popular'], queryFn: () => moviesApi.getPopular() });

export const useTopRated = () =>
  useQuery({ queryKey: ['movies', 'top-rated'], queryFn: () => moviesApi.getTopRated() });

export const useUpcoming = () =>
  useQuery({ queryKey: ['movies', 'upcoming'], queryFn: () => moviesApi.getUpcoming() });

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesApi.getDetails(id),
    enabled: !!id,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => moviesApi.getSimilar(id),
    enabled: !!id,
  });

export const useSearchMovies = (
  query: string,
  filters: { genreId?: string; year?: string; rating?: string; sortBy?: string },
  page = 1
) => {
  const params: Record<string, string | number> = {};
  if (filters.sortBy) params['sort_by'] = filters.sortBy;
  if (filters.genreId) params['with_genres'] = filters.genreId;
  if (filters.year) params['primary_release_year'] = filters.year;
  if (filters.rating) params['vote_average.gte'] = filters.rating;

  const isSearch = query.trim().length > 0;

  return useQuery({
    queryKey: ['movies', 'search', query, filters, page],
    queryFn: () =>
      isSearch
        ? moviesApi.search(query, page, params)
        : moviesApi.discover({ page, ...params }),
    enabled: true,
  });
};

export const useGenres = () =>
  useQuery({ queryKey: ['genres'], queryFn: moviesApi.getGenres, staleTime: Infinity });
