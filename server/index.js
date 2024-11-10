import { database } from './db.js';
import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

app.listen(port, () => {
  console.log(`\nServer started on http://localhost:${port}`);
});

app.post('/save', async (req, res) => {
  await database.connect();
  const options = req.query;
  await database.saveScore(options['name'], options['score']);
  res.status(200);
  res.json({'status':'saved'});
  await database.close();
});

app.get('/load', async (req, res) => {
  await database.connect();
  const data = await database.loadAllScores();
  res.status(200);
  res.json(data);
  await database.close();
});

app.put('/edit', async (req, res) => {
  await database.connect();
  const options = req.query;
  const data = await database.editScore(options['name'], options['score']);
  res.status(200);
  res.json(data);
  await database.close();
});

app.delete('/delete', async (req, res) => {
  await database.connect();
  const options = req.query;
  await database.deleteScore(options['name'], options['score']);
  res.status(200);
  res.json({'status':'deleted'});
  await database.close();
});