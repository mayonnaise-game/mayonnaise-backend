import { readFileSync } from "fs";

const leaderboard = [];
const userMap = new Map(); // {uuid: {username, score, heart}}
const chats = {
  MAX_LENGTH: 1000,
  THRESHOLD: 2000, // THRESHOLD 보다 커지면 MAX_LENGTH가 되도록 자름
  startIndex: 0,
  data: [],
};


export { leaderboard, userMap, chats };


export const recipeData = JSON.parse(readFileSync("./src/data/recipe.json", "utf-8")).COOKRCP01.row;

export const currentGameData = {
  recipeIndex: null, // 
  gameId: null,
  startTime: null,
  answerBlankData: null,
  mainImageUrl: null,
  hint1: null,
  hint2: null,
  // 서버에서만 사용
  currentRecipe: null,
}

