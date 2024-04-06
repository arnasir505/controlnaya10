import React from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearForm,
  selectNewPost,
  selectNewPostSubmitLoading,
  updateBody,
  updateImage,
  updateTitle,
} from '../../store/newPostSlice/newPostSlice';
import { LoadingButton } from '@mui/lab';
import { createNewPost } from '../../store/newPostSlice/newPostThunks';
import { useNavigate } from 'react-router-dom';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newPost = useAppSelector(selectNewPost);
  const loading = useAppSelector(selectNewPostSubmitLoading);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(localImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNewPost(newPost));
    dispatch(clearForm());
    navigate('/');
  };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add new post
      </Typography>
      <form onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='text'
              name='title'
              label='Title'
              required
              value={newPost.title}
              onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              type='text'
              name='body'
              label='Content'
              required
              rows={5}
              value={newPost.body}
              onChange={(e) => dispatch(updateBody(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              onChange={fileInputChangeHandler}
              name='image'
              label='Image'
            />
          </Grid>
          <Grid item>
            <LoadingButton type='submit' variant='contained' loading={loading}>
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewPost;
