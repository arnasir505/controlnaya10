import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostWithoutId } from '../../types';

export const createNewPost = createAsyncThunk<void, PostWithoutId>(
  'newPost/create',
  async (postData) => {
    try {
      const blobUrlToFile = async (blobUrl: string): Promise<File> => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        const filename = blobUrl.substring(blobUrl.lastIndexOf('/') + 1);

        const file = new File([blob], filename, { type: blob.type });

        return file;
      };
      const formData = new FormData();

      formData.append('title', postData.title);
      formData.append('body', postData.body);

      if (postData.image) {
        const imageAsFile = await blobUrlToFile(postData.image);
        formData.append('image', imageAsFile);
      }
      await axiosApi.post('/news', formData);
    } catch (error) {
      console.log(error);
    }
  }
);
