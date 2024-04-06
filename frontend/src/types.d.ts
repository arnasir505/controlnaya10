export interface PostWithoutId {
  title: string;
  body: string;
  image: string | null;
}

export interface NewsShort {
  id: number;
  title: string;
  image: string | null;
  date: string;
}

export interface News extends NewsShort {
  body: string;
}

export type NewsWithoutId = Omit<News, 'id'>;

export interface CommentWithoutId {
  author: string;
  body: string;
}

export interface CommentWithNewsId extends CommentWithoutId {
  newsId: number;
}

export interface ApiComment {
  id: number;
  newsId: number;
  author: string | null;
  body: string;
}
