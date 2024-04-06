import { Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import FileInput from '../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';

const NewPost: React.FC = () => {

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      // dispatch(updateImage(localImageUrl));
    }
  };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant='h4' sx={{mb: 2}}>Add new post</Typography>
      <form>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='text'
              name='title'
              label='Title'
              required
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
            <LoadingButton
              type='submit'
              variant='contained'
              loading={false}
            >
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewPost;
