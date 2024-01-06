// bootstrap express app

import express from "express";
import leaderboardRouter from "./routes/leaderboard.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();
const port = 8080;

app.use("/leaderboard", leaderboardRouter);
app.use("/chats", chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
