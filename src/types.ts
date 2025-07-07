export interface Genre {
  id: number;
  name: string;
}

export interface MediaItem {
  id: number;
  media_type: 'tv' | 'movie';
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  original_title?: string;
  original_name?: string;
  first_air_date: string;
  release_date: string;
  overview: string;
  tagline: string;
  genres: Genre[];
  runtime: string;
  number_of_seasons: string;
  seasons: any;
}

export interface Episode {
  id: number;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  runtime: number;
}

export interface SeasonItem {
  id: number;
  name: string;
  episodes: Episode[];
}

export interface MediaListItem {
  id: number;
  media_type: 'tv' | 'movie';
  title: string;
  poster_path: string | null;
}
