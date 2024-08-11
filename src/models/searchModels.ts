import { MangaSeriesData } from "./seriesModels";

export interface MangaSearchResult {
  title: string;
  link: string;
  image: string;
  rating: string;
  description: string;
}

export interface MangaSearchResponse {
  totalResults: number;
  results: (MangaSeriesData | {})[];
  page: number;
  totalPages: number;
}
