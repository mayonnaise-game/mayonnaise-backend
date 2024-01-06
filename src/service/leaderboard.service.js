import { leaderboard } from "../globals";

const getLeaderboard = (req, res, next) => {
  res.send(leaderboard);
};

const addLeaderboard = (req, res, next) => {
  const { username, score } = req.body;
  const newEntry = { username, score };
  for (let i = 0; i < leaderboard.length; i++) {
    const currentEntry = leaderboard[i];
    if (newEntry.score > currentEntry.score) {
      leaderboard.splice(i, 0, newEntry);
      leaderboard.pop();
      break;
    }
  }
  res.send("success");
};

export { getLeaderboard, addLeaderboard };
