import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

void run();
