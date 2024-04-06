import express from 'express';
import cors from 'cors';
import mySqlDb from './mySqlDb';
import newsRouter from './routers/news/news';
import commentsRouter from './routers/comments/comments';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mySqlDb.init();

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

void run();
