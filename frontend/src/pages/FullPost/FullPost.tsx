import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewsById } from '../../store/newsSlice/newsThunks';
import {
  selectFullPost,
  selectFullPostComments,
  selectFullPostCommentsLoading,
} from '../../store/fullPostSlice/fullPostSlice';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants';
import { LoadingButton } from '@mui/lab';
import { CommentWithoutId } from '../../types';
import {
  addComment,
  deleteComment,
  fetchComments,
} from '../../store/fullPostSlice/fullPostThunks';

const FullPost: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { title, body, image, date } = useAppSelector(selectFullPost);
  const comments = useAppSelector(selectFullPostComments);
  const commentsLoading = useAppSelector(selectFullPostCommentsLoading);
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

  const onCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      await dispatch(addComment({ newsId: Number(params.id), ...commentForm }));
      setCommentForm({ author: '', body: '' });
    }
  };

  const onCommentDelete = async (id: number) => {
    if (params.id) {
      const confirmDelete = confirm('Delete this comment?');
      if (confirmDelete) {
        await dispatch(deleteComment(id));
        await dispatch(fetchComments(params.id));
      }
    }
  };

  const getNews = async () => {
    if (params.id) {
      await dispatch(fetchNewsById(params.id));
      await dispatch(fetchComments(params.id));
    }
  };

  useEffect(() => {
    void getNews();
  }, [params.id]);

  let contentComments = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (comments.length > 0 && !commentsLoading) {
    contentComments = (
      <>
        {comments.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2, border: '1px solid #000' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mr: 1 }}>
                {comment.author ? comment.author : 'Anonymous'}:
              </Typography>
              <Typography variant='body1'>{comment.body}</Typography>
              <Button
                color='error'
                variant='contained'
                sx={{ ml: 'auto' }}
                onClick={() => onCommentDelete(comment.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else if (comments.length === 0 && !commentsLoading) {
    contentComments = (
      <Typography>
        No comments yet.
      </Typography>
    );
  }

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
      {contentComments}
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
