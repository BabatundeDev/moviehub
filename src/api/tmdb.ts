import axios from 'axios';
import type { Movie, Genre, PaginatedResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const posterUrl = (path: string | null, size = 'w342') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/placeholder-poster.svg';
export const backdropUrl = (path: string | null) =>
  path ? `${IMAGE_BASE}/original${path}` : null;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' },
});

export const moviesApi = {
  getNowPlaying: (page = 1): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/movie/now_playing', { params: { page } }).then(r => r.data),

  getPopular: (page = 1): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/movie/popular', { params: { page } }).then(r => r.data),

  getTopRated: (page = 1): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/movie/top_rated', { params: { page } }).then(r => r.data),

  getUpcoming: (page = 1): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/movie/upcoming', { params: { page } }).then(r => r.data),

  getDetails: (id: number): Promise<Movie> =>
    tmdb.get(`/movie/${id}`, { params: { append_to_response: 'credits' } }).then(r => r.data),

  getSimilar: (id: number): Promise<PaginatedResponse<Movie>> =>
    tmdb.get(`/movie/${id}/similar`).then(r => r.data),

  search: (
    query: string,
    page = 1,
    params: Record<string, string | number> = {}
  ): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/search/movie', { params: { query, page, ...params } }).then(r => r.data),

  discover: (params: Record<string, string | number> = {}): Promise<PaginatedResponse<Movie>> =>
    tmdb.get('/discover/movie', { params }).then(r => r.data),

  getGenres: (): Promise<{ genres: Genre[] }> =>
    tmdb.get('/genre/movie/list').then(r => r.data),
};
