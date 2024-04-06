import express from 'express';
import mySqlDb from '../../mySqlDb';
import { RowDataPacket } from 'mysql2/promise';
import { News } from '../../types';

const newsRouter = express.Router();

newsRouter.get('/', async (_req, res, next) => {
  try {
    const [result] = await mySqlDb
      .getConnection()
      .query('SELECT id, title, image, date FROM news');
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

newsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  const [result] = (await mySqlDb
    .getConnection()
    .query(`SELECT * from news WHERE id = ${id}`)) as RowDataPacket[];

  const category: News = result[0];

  if (!category) {
    return res.status(404).send({ error: 'Not Found!' });
  }

  return res.send(category);
});

export default newsRouter;
