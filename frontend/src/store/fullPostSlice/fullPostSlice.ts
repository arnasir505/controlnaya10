import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { News, NewsWithoutId } from '../../types';
import { RootState } from '../../app/store';
import { fetchNewsById } from '../newsSlice/newsThunks';

interface FullPostState {
  data: NewsWithoutId;
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
  },
});

export const fullPostReducer = fullPostSlice.reducer;
export const selectFullPost = (state: RootState) => state.fullPost.data;
export const selectFullPostLoading = (state: RootState) =>
  state.fullPost.loading;
