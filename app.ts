import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';

import { getUserState, setUserState } from './lib/state';
import { parseTrace, vfLaunch, vfMessage } from './lib/voiceflow';

dotenv.config();

const WELCOME_RESULT =
  'Welcome to Peter\'s Pizza. What would you like on your pizza? List ingredients one by one and say "done" to confirm your order.';
const ERROR_RESULT = 'Something went wrong';

const postMessage = async (req: Request, res: Response): Promise<Response> => {
  const { userID, message } = req.body;

  if (!userID || !message) {
    return res.send([ERROR_RESULT]);
  }

  const result = [];

  let state = getUserState(userID);

  if (!state) {
    const launchRes = await vfLaunch();
    if (launchRes?.trace) {
      result.push(...parseTrace(launchRes.trace));
    }
    // The very first launch doesn't seem to work, so using this as a workaround
    if (!result.length) {
      result.push(WELCOME_RESULT);
    }
    state = launchRes?.state;
  }

  const vfRes = await vfMessage(message, state);

  if (!vfRes) {
    return res.send([...result, ERROR_RESULT]);
  }

  setUserState(userID, vfRes.state);

  result.push(...parseTrace(vfRes.trace));

  return res.send(result);
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
