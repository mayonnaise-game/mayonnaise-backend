import { readFileSync } from "fs";

const leaderboard = [];

export { leaderboard };

export const userMap = new Map();

export const recipeData = JSON.parse(readFileSync("./src/data/recipe.json", "utf-8")).COOKRCP01.row;

export const currentGameData = {
  recipeIndex: 0, // 
  gameId: "",
  startTime: new Date().toISOString(),
  answerBlankData: "",
  recipeHint: [],
}

