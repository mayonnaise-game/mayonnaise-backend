import { userMap, chats, currentGameData } from '../globals.js';
import { authUuid } from '../utils/auth.js';
import { nextGame } from '../reset/nextGame.js';

const SCORE = 100;

const getChats = (req, res, next) => {
  const { 'user-uuid': cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;
  try {
    authUuid(userUuid);

    const { lastMessageIndex } = req.query;
    if (!lastMessageIndex) {
      res.status(401);
      res.json({
        error: true,
        message: 'lastMessageIndex is required.',
      });
    }
    const newChatData = chats.data.slice(
      lastMessageIndex - chats.startIndex + 1
    );

    const data = [];
    for (const { uuid, createdAt, chatData } of newChatData) {
      const { username } = userMap.get(uuid);
      const isCurrentUser = userUuid === uuid;

      data.push({
        index: lastMessageIndex + 1 + data.length,
        user: { username },
        isCurrentUser,
        chatData,
        createdAt,
      });
    }
    res.json({ data, message: 'success' });
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: true,
      message: 'Invalid Request',
    });
  }
};

const addChat = (req, res, next) => {
  const { 'user-uuid': cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;
  try {
    authUuid(userUuid);

    const { userInput } = req.body;
    chats.data.push({
      uuid: userUuid,
      createdAt: new Date().toISOString(),
      chatData: userInput,
    });
    if (chats.data.length > chats.THRESHOLD) {
      const diff = chats.data.length - chats.MAX_LENGTH;
      chats.startIndex += diff;
      chats.data.splice(0, diff);
    }
    const answer = currentGameData.currentRecipe.RCP_MM;
    console.log(`answer: ${answer}, userInput: ${userInput}`);
    const isAnswerCorrect = answer.trim() === userInput.trim();
    if (isAnswerCorrect) {
      // 정답자에게 점수 주고 다음 게임으로 속행
      userMap.get(userUuid).score += SCORE;
      nextGame();
    }
    res.json({
      data: {
        userInput,
        messageIndex: chats.startIndex + chats.data.length - 1,
        isAnswerCorrect,
      },
      message: 'success',
    });
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: true,
      userMap,
      userUuid,
      message: 'Invalid Request',
    });
  }
};

export { getChats, addChat };
