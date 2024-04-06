import express from 'express';
import mySqlDb from '../../mySqlDb';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { News, NewsWithoutId } from '../../types';
import { imagesUpload } from '../../multer';

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

  const news: News = result[0];

  if (!news) {
    return res.status(404).send({ error: 'Not Found!' });
  }

  return res.send(news);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.body) {
      return res
        .status(400)
        .send({ error: 'News title and body must be present!' });
    }

    const date = new Date();

    const newsData: NewsWithoutId = {
      title: req.body.title,
      body: req.body.body,
      image: req.file ? req.file.filename : null,
      date: date.toISOString(),
    };

    const [result] = (await mySqlDb
      .getConnection()
      .query(
        'INSERT INTO news (title, body, image, date)' + 'VALUES (?, ?, ?, ?)',
        [newsData.title, newsData.body, newsData.image, newsData.date]
      )) as ResultSetHeader[];

    return res.send({ id: result.insertId, ...newsData });
  } catch (error) {
    next(error);
  }
});

newsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const [news_ids] = await mySqlDb
      .getConnection()
      .query('SELECT id FROM news');

    const result = JSON.stringify(news_ids);
    const parsed: Record<'id', number>[] = JSON.parse(result);

    const foundIndexOfNewsId = parsed.findIndex(
      (news) => news.id === Number(id)
    );

    if (foundIndexOfNewsId === -1) {
      return res.status(404).send({ error: 'Not Found!' });
    }

    await mySqlDb
      .getConnection()
      .query(`DELETE FROM news WHERE id = ${id} LIMIT 1`);

    return res.send(`DELETED news with id: ${id}`);
  } catch (error) {
    next(error)
  }
})

export default newsRouter;
