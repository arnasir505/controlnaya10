import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NewsShort } from '../../types';
import { RootState } from '../../app/store';
import { deleteNews, fetchNews } from './newsThunks';

interface NewsState {
  data: NewsShort[];
  loading: boolean;
  error: boolean;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, { payload: news }: PayloadAction<NewsShort[]>) => {
          state.loading = false;
          state.data = news;
        }
      )
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(deleteNews.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const newsReducer = newsSlice.reducer;
export const selectNews = (state: RootState) => state.news.data;
export const selectNewsLoading = (state: RootState) => state.news.loading;
