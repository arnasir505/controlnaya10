import { configureStore } from '@reduxjs/toolkit';
import { newPostReducer } from '../store/newPostSlice/newPostSlice';
import { newsReducer } from '../store/newsSlice/newsSlice';
import { fullPostReducer } from '../store/fullPostSlice/fullPostSlice';

export const store = configureStore({
  reducer: {
    newPost: newPostReducer,
    news: newsReducer,
    fullPost: fullPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
