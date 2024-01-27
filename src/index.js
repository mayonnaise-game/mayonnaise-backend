// bootstrap express app

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import leaderboardRouter from './routes/leaderboard.route.js';
import loginRouter from './routes/login.route.js';
import chatRouter from './routes/chat.route.js';
import gamesRouter from './routes/games.route.js';
import userRouter from './routes/user.route.js';

const app = express();
const port = 8080;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://local.yoriquiz.site',
    'https://yoriquiz.site',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/leaderboard', leaderboardRouter);
app.use('/chats', chatRouter);
app.use('/login', loginRouter);
app.use('/games', gamesRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
