import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../app/hooks';
import { deleteNews, fetchNews } from '../../store/newsSlice/newsThunks';

interface Props {
  id: number;
  title: string;
  image: string | null;
  date: string;
}

const PostCard: React.FC<Props> = ({ id, title, image, date }) => {
  const dispatch = useAppDispatch();

  const onDelete = async (id: number) => {
    const confirmDelete = confirm('Delete this news?');
    if (confirmDelete) {
      await dispatch(deleteNews(id));
      await dispatch(fetchNews());
    }
  };

  return (
    <Card
      sx={{
        my: 1,
        border: '1px solid grey',
        display: 'flex',
      }}
    >
      {image ? (
        <CardMedia
          component={'img'}
          image={apiUrl + '/' + image}
          alt='img'
          sx={{ width: 151 }}
        ></CardMedia>
      ) : null}
      <CardContent>
        <Typography variant='h6'>{title}</Typography>
        <Typography color={'text.secondary'}>
          At {dayjs(date).format('DD.MM.YYYY HH:mm')}
        </Typography>
        <Link to={`/news/${id}`}>Read full post</Link>
      </CardContent>
      <Button
        variant='contained'
        color='error'
        sx={{ ml: 'auto', mr: 2, alignSelf: 'center' }}
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </Card>
  );
};

export default PostCard;
