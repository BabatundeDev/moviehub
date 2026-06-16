export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  tagline?: string;
  original_language?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  popularity?: number;
  production_companies?: ProductionCompany[];
  credits?: Credits;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  query: string;
  genreId: string;
  year: string;
  rating: string;
  sortBy: string;
}
