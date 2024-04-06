export interface NewsWithoutId {
  title: string;
  body: string;
  image: string | null;
  date: string;
}

export interface News extends NewsWithoutId {
  id: number;
}

export interface CommentWithoutId {
  newsId: number;
  author: string | null;
  body: string;
}

export interface Comment extends CommentWithoutId {
  id: number;
}
