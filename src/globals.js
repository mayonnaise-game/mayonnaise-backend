import { readFileSync, writeFileSync } from "fs";

export const leaderboard = JSON.parse(
  readFileSync("./src/data/leaderboard.json", "utf-8")
);

export function writeLeaderboard() {
  writeFileSync("./src/data/leaderboard.json", JSON.stringify(leaderboard));
}
export const userMap = new Map(); // {uuid: {username, score, heart}}

export const chats = {
  MAX_LENGTH: 1000,
  THRESHOLD: 2000, // THRESHOLD 보다 커지면 MAX_LENGTH가 되도록 자름
  startIndex: 0,
  data: [],
};

export const recipeData = JSON.parse(
  readFileSync("./src/data/recipe.json", "utf-8")
).COOKRCP01.row;

export const currentGameData = {
  recipeIndex: null, //
  gameId: "",
  startTime: new Date().toISOString(),
  answerBlankData: "",
  recipeHint: [],
};
