import { Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewsById } from '../../store/newsSlice/newsThunks';
import { selectFullPost } from '../../store/fullPostSlice/fullPostSlice';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants';
import { LoadingButton } from '@mui/lab';
import { CommentWithoutId } from '../../types';

const FullPost: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { title, body, image, date } = useAppSelector(selectFullPost);

  const [commentForm, setCommentForm] = useState<CommentWithoutId>({
    author: '',
    body: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCommentForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const onCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(commentForm);
    setCommentForm({ author: '', body: '' });
  };

  const getNews = async () => {
    if (params.id) {
      await dispatch(fetchNewsById(params.id));
    }
  };

  useEffect(() => {
    void getNews();
  }, [params.id]);

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant='h3'>{title}</Typography>
      <Typography color={'text.secondary'} sx={{ mb: 3 }}>
        At {dayjs(date).format('DD.MM.YYYY HH:mm')}
      </Typography>
      {image ? (
        <img
          src={apiUrl + '/' + image}
          alt='img'
          style={{ maxWidth: '450px', height: 'auto' }}
        />
      ) : null}
      <Typography variant='body1' sx={{ mt: 1 }}>
        {body}
      </Typography>
      <Typography variant='h4' sx={{ mt: 2 }}>
        Comments
      </Typography>
      <Typography variant='h4' sx={{ mt: 2, mb: 1 }}>
        Add comment
      </Typography>
      <form onSubmit={onCommentSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='text'
              name='author'
              label='Author'
              value={commentForm.author}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              type='text'
              name='body'
              label='Comment'
              required
              rows={2}
              value={commentForm.body}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <LoadingButton type='submit' variant='contained' loading={false}>
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FullPost;
