export interface PostWithoutId {
  title: string;
  body: string;
  image: string | null;
}

export interface News {
  id: number;
  title: string;
  body: string;
  image: string | null;
  date: string;
}
