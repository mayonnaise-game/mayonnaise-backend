const leaderboard = [];
const userMap = new Map();
const chats = {
  MAX_LENGTH: 1000,
  THRESHOLD: 2000, // THRESHOLD 보다 커지면 MAX_LENGTH가 되도록 자름
  startIndex: 0,
  data: [],
};

export { leaderboard, userMap, chats };
