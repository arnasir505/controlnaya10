import express from 'express';
import mySqlDb from '../../mySqlDb';
import { CommentWithoutId } from '../../types';
import { ResultSetHeader } from 'mysql2';

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

commentsRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.body || !req.body.newsId) {
      return res
        .status(400)
        .send({ error: 'Comment body and news id must be present!' });
    }

    const [news_ids] = await mySqlDb
      .getConnection()
      .query('SELECT id FROM news');

    const stringified = JSON.stringify(news_ids);
    const parsed: Record<'id', number>[] = JSON.parse(stringified);

    const foundIndex = parsed.findIndex(
      (news) => news.id === Number(req.body.newsId)
    );

    if (foundIndex === -1) {
      return res.status(404).send({ error: 'Not Found!' });
    }

    const commentData: CommentWithoutId = {
      newsId: req.body.newsId,
      author: req.body.author || null,
      body: req.body.body,
    };

    const [result] = (await mySqlDb
      .getConnection()
      .query(
        'INSERT INTO comments (news_id, author, body)' + 'VALUES (?, ?, ?)',
        [commentData.newsId, commentData.author, commentData.body]
      )) as ResultSetHeader[];

    res.send({ id: result.insertId, ...commentData });
  } catch (error) {
    next(error);
  }
});

commentsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const [comments_ids] = await mySqlDb
      .getConnection()
      .query('SELECT id FROM comments');

    const result = JSON.stringify(comments_ids);
    const parsed: Record<'id', number>[] = JSON.parse(result);

    const foundIndexOfCommentId = parsed.findIndex(
      (comment) => comment.id === Number(id)
    );

    if (foundIndexOfCommentId === -1) {
      return res.status(404).send({ error: 'Not Found!' });
    }

    await mySqlDb
      .getConnection()
      .query(`DELETE FROM comments WHERE id = ${id} LIMIT 1`);

    return res.send(`DELETED comment with id: ${id}`);
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;
