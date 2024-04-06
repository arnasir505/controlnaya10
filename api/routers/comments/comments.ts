import express from 'express';
import mySqlDb from '../../mySqlDb';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const newsId = req.query.news_id;

    if (newsId) {
      const [result] = await mySqlDb
        .getConnection()
        .query(`SELECT * FROM comments WHERE news_id = ${newsId}`);

      return res.send(result);
    }

    const [result] = await mySqlDb
      .getConnection()
      .query('SELECT * FROM comments');
    return res.send(result);
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;
