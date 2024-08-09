export interface MangaSeriesData {
  mangaId: string;
  title: string;
  author: string;
  image: string;
  rating: { ratingAvg: string; totalVotes: string };
  description: string;
  status: string;
  genres: string[];
  totalChapters: number;
  chapters: { title: string; link: string }[];
}

