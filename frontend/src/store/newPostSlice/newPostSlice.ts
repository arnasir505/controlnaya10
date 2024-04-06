import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostWithoutId } from '../../types';
import { RootState } from '../../app/store';

interface NewPostState {
  data: PostWithoutId;
  filename: string;
  loading: boolean;
  error: boolean;
}

const initialState: NewPostState = {
  data: {
    title: '',
    body: '',
    image: null,
  },
  filename: '',
  loading: false,
  error: false,
};

const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    updateTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.data.title = title;
    },
    updateBody: (state, { payload: body }: PayloadAction<string>) => {
      state.data.body = body;
    },
    updateImage: (state, { payload: image }: PayloadAction<string>) => {
      state.data.image = image;
    },
    updateFilename: (state, { payload: filename }: PayloadAction<string>) => {
      state.filename = filename;
    },
    clearForm: (state) => {
      state.data = { title: '', body: '', image: null };
      state.filename = '';
    },
  },
});

export const newPostReducer = newPostSlice.reducer;
export const {
  updateTitle,
  updateBody,
  updateImage,
  updateFilename,
  clearForm,
} = newPostSlice.actions;
export const selectNewPost = (state: RootState) => state.newPost.data;
export const selectNewPostImageName = (state: RootState) =>
  state.newPost.filename;
export const selectNewPostSubmitLoading = (state: RootState) =>
  state.newPost.loading;
