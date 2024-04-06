import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { CommentWithNewsId, CommentWithoutId } from '../../types';

export const addComment = createAsyncThunk<CommentWithNewsId, CommentWithoutId>(
  'fullPost/addComment',
  async (comment) => {
    try {
      const { data: postedComment } = await axiosApi.post<CommentWithNewsId>(
        '/news',
        comment
      );
      return postedComment;
    } catch (error) {
      console.log(error);
      return {} as CommentWithNewsId;
    }
  }
);
