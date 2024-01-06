// bootstrap express app

import express from "express";
import cookieParser from "cookie-parser";

import leaderboardRouter from "./routes/leaderboard.route.js";
import loginRouter from "./routes/login.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();
const port = 8080;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// routes
app.use("/leaderboard", leaderboardRouter);
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
