import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

// load in environment variables from .env file
dotenv.config();

// Create Express server
const app = express();

// Express configuration
app.use(express.static('static'));
app.set('port', 4000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get('/', (_, res) => res.sendFile(path.join(`${__dirname}/index.html`)));

app.post('/message', (req, res) => {
  console.log(req.body);

  // TODO: implement route

  res.send(['hello world!', 'goodbye']);
});

export default app;
