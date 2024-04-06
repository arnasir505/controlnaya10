import { configureStore } from '@reduxjs/toolkit';
import { newPostReducer } from '../store/newPostSlice/newPostSlice';

export const store = configureStore({
  reducer: {
    newPost: newPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
