import { configureStore } from '@reduxjs/toolkit';
import { newPostReducer } from '../store/newPostSlice/newPostSlice';
import { newsReducer } from '../store/newsSlice/newsSlice';

export const store = configureStore({
  reducer: {
    newPost: newPostReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
