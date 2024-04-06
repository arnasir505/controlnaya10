import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { NewsShort } from '../../types';

export const fetchNews = createAsyncThunk('news/fetch', async () => {
  try {
    const { data: news } = await axiosApi.get<NewsShort[]>('/news');

    return news;
  } catch (error) {
    console.log(error);
    return [];
  }
});
