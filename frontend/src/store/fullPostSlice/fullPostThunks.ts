import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ApiComment, CommentWithNewsId } from '../../types';

export const addComment = createAsyncThunk<ApiComment, CommentWithNewsId>(
  'fullPost/addComment',
  async (comment) => {
    try {
      const { data: postedComment } = await axiosApi.post<ApiComment>(
        '/comments',
        comment
      );
      return postedComment;
    } catch (error) {
      console.log(error);
      return {} as ApiComment;
    }
  }
);

export const fetchComments = createAsyncThunk<ApiComment[], string>(
  'fullPost/fetchComments',
  async (id) => {
    try {
      const { data: comments } = await axiosApi.get<ApiComment[]>(
        `/comments?news_id=${id}`
      );
      return comments;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
