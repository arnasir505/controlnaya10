import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const News: React.FC = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container>
        <Grid item sx={{ mr: 'auto' }}>
          <Typography variant='h4'>Posts</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to={'/new-post'} variant='contained'>
            Add new post
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default News;
