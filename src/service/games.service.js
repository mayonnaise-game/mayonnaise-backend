import { currentGameData, recipeData } from "../globals.js";
import { v4 as uuidv4 } from 'uuid';
import { getRecipeStepImageListFromObject } from "../utils/getRecipeStepImageListFromObject.js";

export function getCurrentGame(req, res, next) {
  // 게임의 유효기간이 경과했을 때
  const currentGame = currentGameData

  if (!currentGame) {
    res.status(400).send("Bad Request");
    return;
  }

  const previousStartTime = new Date(currentGame.startTime).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - previousStartTime;



  let randomInt;
  console.log("timeDiff", timeDiff / 1000)
  let recipeHintServer = [];

  const currentServerGameData = currentGameData;

  let result = {
    gameId: "",
    startTime: "",
    answerBlankData: "",
    mainImageUrl: [],
    hint1: null,
    hint2: null
  }

  // 130초가 지났을 때
  if (timeDiff > 1000 * 130) {
    // if (true) {

    // random integer between 0 and 999
    const recipeDataList = recipeData;
    // console.log("recipeDataList", recipeDataList)
    randomInt = Math.floor(Math.random() * 1000)
    // currentRecipe = recipeDataList[randomInt];
    console.log("currentServerGameData", currentServerGameData?.currentRecipe?.RCP_NM)
    const gameId = uuidv4();
    // 새로운 게임으로 교체
    const currentRecipeFoodName = currentServerGameData?.currentRecipe?.RCP_NM;
    const answerBlankData = currentRecipeFoodName.replace(/[가-힣]/g, "_");


    currentServerGameData.gameId = gameId;
    currentServerGameData.startTime = new Date().toISOString();
    currentServerGameData.answerBlankData = answerBlankData;
    currentServerGameData.mainImageUrl = currentRecipe.ATT_FILE_NO_MAIN;
    currentServerGameData.hint1 = null;
    currentServerGameData.hint2 = null;

    currentServerGameData.currentRecipe = currentRecipe;
    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      mainImageUrl: currentServerGameData.mainImageUrl,
      hint1: null,
      hint2: null,
    }
  }

  // 0초 이상 40초 미만 지났을 때 
  if (1000 * 0 <= timeDiff && timeDiff < 1000 * 40) {
    // random integer between 0 and 999
    const recipeDataListFile = recipeData;
    const gameId = uuidv4();

    const recipeDataList = recipeData;
    randomInt = Math.floor(Math.random() * 1000)
    currentServerGameData.currentRecipe = currentServerGameData.currentRecipe ?? recipeDataList[randomInt];
    console.log("currentServerGameData", currentServerGameData?.currentRecipe?.RCP_NM)


    const currentRecipeFoodName = currentServerGameData.currentRecipe.RCP_NM;
    const answerBlankData = currentRecipeFoodName.replace(/[가-힣]/g, "_");
    currentServerGameData.gameId = currentServerGameData.gameId ?? gameId;
    currentServerGameData.answerBlankData = currentServerGameData.answerBlankData ?? answerBlankData;


    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    // currentRecipe = recipeDataListFile[currentServerGameData.recipeIndex];

    const initialCompleteFoodImage = currentServerGameData.currentRecipe.ATT_FILE_NO_MAIN
    currentServerGameData.mainImageUrl = initialCompleteFoodImage;
    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      mainImageUrl: currentServerGameData.mainImageUrl,
      hint1: null,
      hint2: null,
    }

  }
  // 40초 이상 80초 미만 지났을 때 
  if (1000 * 40 <= timeDiff && timeDiff < 1000 * 80) {

    const recipeDataListFile = recipeData;

    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    currentRecipe = recipeDataListFile[currentServerGameData.recipeIndex];

    const recipeStepImageList = getRecipeStepImageListFromObject(currentServerGameData?.currentRecipe);
    currentServerGameData.hint1 = recipeStepImageList;
    console.log("currentServerGameData", currentServerGameData?.currentRecipe?.RCP_NM)

    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      mainImageUrl: currentServerGameData.mainImageUrl,
      hint1: currentServerGameData.hint1,
      hint2: null,
    }
  }

  // 80초 이상 120초 미만 지났을 때 
  if (1000 * 80 <= timeDiff && timeDiff < 1000 * 120) {


    const recipeDataListFile = recipeData;

    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    currentRecipe = recipeDataListFile[currentServerGameData.recipeIndex];


    currentServerGameData.hint2 = currentServerGameData.currentRecipe.RCP_PARTS_DTLS

    console.log("currentServerGameData", currentServerGameData?.currentRecipe?.RCP_NM)

    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      mainImageUrl: currentServerGameData.mainImageUrl,
      hint1: currentServerGameData.hint1,
      hint2: currentServerGameData.hint2,
    }
  }

  // 120초 이상 130초 미만 지났을 때 
  if (1000 * 120 <= timeDiff && timeDiff < 1000 * 130) {
    const recipeDataListFile = recipeData;

    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    currentRecipe = recipeDataListFile[currentServerGameData.recipeIndex];


    currentServerGameData.answerBlankData = currentRecipe.RCP_NM;
    console.log("currentServerGameData", currentServerGameData?.currentRecipe?.RCP_NM)

    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      mainImageUrl: currentServerGameData.mainImageUrl,
      hint1: currentServerGameData.hint1,
      hint2: currentServerGameData.hint2,
    }
  }


  try {
    res.setHeader("Content-Type", "application/json");
    // set cookie key as user-uuid, and value as uuid, domain is api.yoriquiz.site expires in 1 day
    res.json({ data: { ...result, debugTimeDiff: timeDiff / 1000 }, message: "success" });

    return;

  } catch (err) {
    next(err);
  }
}