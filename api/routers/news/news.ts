import express from 'express';

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => {
  return res.send('GET news');
});

export default newsRouter;
