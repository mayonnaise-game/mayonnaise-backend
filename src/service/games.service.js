import { currentGameData, recipeData } from "../globals.js";
import { v4 as uuidv4 } from 'uuid';

export async function getCurrentGame(req, res, next) {


  // 비인가 유저 막음 
  // const userUuid = req.cookies['user-uuid'];

  // if (!userUuid) {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }


  // 게임의 유효기간이 경과했을 때
  const currentGame = currentGameData
  if (!currentGame) {
    res.status(400).send("Bad Request");
    return;
  }

  const previousStartTime = new Date(currentGame.startTime).getTime();
  const currentTime = new Date().getTime();



  const timeDiff = currentTime - previousStartTime;
  let currentRecipe;
  let randomInt;
  console.log("timeDiff", timeDiff / 1000)
  let recipeHintServer = [];

  const currentServerGameData = currentGameData;

  let result = {
    gameId: "",
    startTime: "",
    answerBlankData: "",
    recipeData: [],
  }
  // 130초가 지났을 때
  if (timeDiff > 1000 * 130) {
    // if (true) {

    // random integer between 0 and 999
    const recipeDataList = recipeData;
    // console.log("recipeDataList", recipeDataList)
    randomInt = Math.floor(Math.random() * 1000)
    currentRecipe = recipeDataList[randomInt];
    const gameId = uuidv4();
    // 새로운 게임으로 교체
    const currentRecipeFoodName = currentRecipe.RCP_NM;
    const answerBlankData = currentRecipeFoodName.replace(/[가-힣]/g, "_");


    currentServerGameData.gameId = gameId;
    currentServerGameData.startTime = new Date().toISOString();
    currentServerGameData.answerBlankData = answerBlankData;
    currentServerGameData.recipeHint = [];
    currentServerGameData.currentRecipe = currentRecipe;

    const result = {
      data: {
        gameId: currentServerGameData.gameId,
        startTime: currentServerGameData.startTime,
        answerBlankData: currentServerGameData.answerBlankData,
        recipeHint: currentServerGameData.recipeHint,
      },
      message: "success"
    }

    try {
      res.setHeader("Content-Type", "application/json");
      // set cookie key as user-uuid, and value as uuid, domain is api.yoriquiz.site expires in 1 day
      res.json(result);

      return;
    } catch (err) {
      next(err);
    }
  }

  // 0초 이상 40초 미만 지났을 때 
  if (1000 * 0 <= timeDiff && timeDiff < 1000 * 40) {
    // random integer between 0 and 999
    const recipeDataList = recipeData;

    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    currentRecipe = recipeDataList[currentServerGameData.recipeIndex];

    const initialCompleteFoodImage = currentRecipe.ATT_FILE_NO_MAIN
    currentServerGameData.recipeHint = [initialCompleteFoodImage]
    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      // recipeHint: currentServerGameData.recipeHint,
      recipeHint: [initialCompleteFoodImage],
    }

  }
  // 40초 이상 80초 미만 지났을 때 
  if (1000 * 40 <= timeDiff && timeDiff < 1000 * 80) {

    const recipeDataList = recipeData;

    const recipeIndex = currentServerGameData.recipeIndex ?? Math.floor(Math.random() * 1000);
    currentServerGameData.recipeIndex = recipeIndex;

    currentRecipe = recipeDataList[currentServerGameData.recipeIndex];
    const initialCompleteFoodImage = currentRecipe.ATT_FILE_NO_MAIN

    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      // recipeHint: currentServerGameData.recipeHint,
      recipeHint: ["hint1", "hint2"],
    }
  }

  // 80초 이상 120초 미만 지났을 때 
  if (1000 * 80 <= timeDiff && timeDiff < 1000 * 120) {
    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      // recipeHint: currentServerGameData.recipeHint,
      recipeHint: ["hint1", "hint2", "hint3"]
    }
  }

  // 120초 이상 130초 미만 지났을 때 
  if (1000 * 120 <= timeDiff && timeDiff < 1000 * 130) {
    result = {
      gameId: currentServerGameData.gameId,
      startTime: currentServerGameData.startTime,
      answerBlankData: currentServerGameData.answerBlankData,
      // recipeHint: currentServerGameData.recipeHint,
      recipeHint: ["hint1", "hint2", "hint3"]
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