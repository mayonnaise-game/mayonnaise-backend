import { chats } from "../globals.js";

const getChats = (req, res, next) => {
  const { lastMessageIndex } = req.query;
  if (!lastMessageIndex) {
    res.status(401);
    res.json({
      error: true,
      message: "lastMessageIndex is required.",
    });
  }
  res.send(chats.data.slice(lastMessageIndex - chats.startIndex));
};

const addChat = (req, res, next) => {
  const { userInput } = req.body;
  chats.data.push(userInput);
  if (chats.data.length > chats.THRESHOLD) {
    const diff = chats.data.length - chats.MAX_LENGTH;
    chats.startIndex += diff;
    chats.data.splice(0, diff);
  }
  res.json({
    data: {
      userInput,
      messageIndex: chats.startIndex + chats.data.length - 1,
      isAnswerCorrect: true, // TODO
    },
    message: "success",
  });
};

export { getChats, addChat };
