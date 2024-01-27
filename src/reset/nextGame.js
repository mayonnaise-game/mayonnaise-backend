import { v4 as uuidv4 } from 'uuid';
import { currentGameData, recipeData } from '../globals.js';

export const nextGame = () => {
  const currentServerGameData = currentGameData;

  // random integer between 0 and 999
  const recipeDataList = recipeData;
  // console.log("recipeDataList", recipeDataList)
  const randomInt = Math.floor(Math.random() * 1000);
  const currentRecipe = recipeDataList[randomInt];
  console.log(
    'currentServerGameData',
    currentServerGameData?.currentRecipe?.RCP_NM
  );
  const gameId = uuidv4();
  // 새로운 게임으로 교체
  const currentRecipeFoodName = currentRecipe.RCP_NM;
  const answerBlankData = currentRecipeFoodName.replace(/[가-힣]/g, '_');

  currentServerGameData.gameId = gameId;
  currentServerGameData.startTime = new Date().toISOString();
  currentServerGameData.answerBlankData = answerBlankData;
  currentServerGameData.mainImageUrl = currentRecipe.ATT_FILE_NO_MAIN;
  currentServerGameData.hint1 = null;
  currentServerGameData.hint2 = null;

  currentServerGameData.currentRecipe = currentRecipe;
};
