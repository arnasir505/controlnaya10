export interface NewsWithoutId {
  title: string;
  body: string;
  image: string | null;
  date: string;
}

export interface News extends NewsWithoutId {
  id: number;
}
