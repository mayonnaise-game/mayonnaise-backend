import { leaderboard, writeLeaderboard } from "../globals.js";

const LEADERBOARD_MAX_LENGTH = 100;

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
      break;
    }
  }
  if (leaderboard.length > LEADERBOARD_MAX_LENGTH) {
    leaderboard = leaderboard.slice(0, LEADERBOARD_MAX_LENGTH);
  }
  res.send("success");
  writeLeaderboard();
};

export { getLeaderboard, addLeaderboard };
