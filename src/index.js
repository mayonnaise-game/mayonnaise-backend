import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import leaderboardRouter from './routes/leaderboard.route.js';
import loginRouter from './routes/login.route.js';
import chatRouter from './routes/chat.route.js';
import gamesRouter from './routes/games.route.js';
import userRouter from './routes/user.route.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
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

io.on('connection', socket => {
  console.log('A user connected with socketID: ', socket.id);
  socket.on('disconnect', () => {
    console.log('A user disconnected with socketID: ', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
