import { Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewsById } from '../../store/newsSlice/newsThunks';
import {
  selectFullPost,
} from '../../store/fullPostSlice/fullPostSlice';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants';

const FullPost: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { title, body, image, date } = useAppSelector(selectFullPost);

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
    </Container>
  );
};

export default FullPost;
