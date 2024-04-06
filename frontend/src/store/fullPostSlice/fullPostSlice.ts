import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentWithNewsId, News, NewsWithoutId } from '../../types';
import { RootState } from '../../app/store';
import { fetchNewsById } from '../newsSlice/newsThunks';
import { addComment } from './fullPostThunks';

interface FullPostState {
  data: NewsWithoutId;
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

const initialState: FullPostState = {
  data: {
    body: '',
    title: '',
    image: null,
    date: '',
  },
  comments: [],
  loading: false,
  error: false,
};

const fullPostSlice = createSlice({
  name: 'fullPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(
        fetchNewsById.fulfilled,
        (state, { payload: news }: PayloadAction<News>) => {
          state.loading = false;
          state.data = {
            body: news.body,
            title: news.title,
            image: news.image,
            date: news.date,
          };
        }
      )
      .addCase(fetchNewsById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(addComment.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, { payload: comment }: PayloadAction<CommentWithNewsId>) => {
          state.loading = false;
          const newComment: Comment = {
            id: comment.id,
            author: comment.author,
            body: comment.body,
          };
          state.comments.push(newComment);
        }
      )
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const fullPostReducer = fullPostSlice.reducer;
export const selectFullPost = (state: RootState) => state.fullPost.data;
export const selectFullPostLoading = (state: RootState) =>
  state.fullPost.loading;
