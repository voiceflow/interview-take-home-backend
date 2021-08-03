import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import { getUserState, setUserState } from './lib/state';
import { vfMessage } from './lib/voiceflow';

// load in environment variables from .env file
dotenv.config();

const postMessage = async (req: Request, res: Response): Promise<Response> => {
  const { userID, message } = req.body;

  if (!userID || !message) {
    // Don't send any response messages if request is invalid
    return res.send([]);
  }

  const state = getUserState(userID);

  const vfRes = await vfMessage(message, state);

  setUserState(userID, vfRes.state);

  const resMessages = [JSON.stringify(vfRes)];

  return res.send(resMessages);
};

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

app.post('/message', postMessage);

export default app;
