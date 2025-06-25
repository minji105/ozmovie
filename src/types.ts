export interface MediaItem {
  id: number;
  media_type: 'tv' | 'movie' | string;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  original_title?: string;
  original_name?: string;
  first_air_date: string;
  release_date: string;
  overview: string;
}
