import React, { useEffect } from 'react';
import { selectNews, selectNewsLoading } from '../../store/newsSlice/newsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNews } from '../../store/newsSlice/newsThunks';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';

const News: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const loading = useAppSelector(selectNewsLoading);

  const getNews = async () => {
    await dispatch(fetchNews());
  };

  useEffect(() => {
    void getNews();
  }, []);

  let content = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={'3rem'} sx={{ mt: 2 }} />
    </Box>
  );

  if (news.length > 0 && !loading) {
    content = (
      <Grid container direction={'column-reverse'}>
        {news.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            date={post.date}
          />
        ))}
      </Grid>
    );
  } else if (news.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No news yet. Create first post!
      </Typography>
    );
  }
  return (
    <Container sx={{ py: 4 }}>
      <Grid container sx={{ mb: 2 }}>
        <Grid item sx={{ mr: 'auto' }}>
          <Typography variant='h4'>Posts</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to={'/new-post'} variant='contained'>
            Add new post
          </Button>
        </Grid>
      </Grid>
      {content}
    </Container>
  );
};

export default News;
