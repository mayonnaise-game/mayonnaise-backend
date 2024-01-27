import { userMap, leaderboard, writeLeaderboard } from '../globals.js';
import { authUuid } from '../utils/auth.js';

const LEADERBOARD_MAX_LENGTH = 100;

const getLeaderboard = (req, res, next) => {
  res.send(leaderboard);
};

const addLeaderboard = (req, res, next) => {
  const { 'user-uuid': cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;
  try {
    authUuid(userUuid);

    const { username, score } = userMap.get(userUuid);
    const newEntry = { username, score };
    for (let i = 0; i < leaderboard.length; i++) {
      const currentEntry = leaderboard[i];
      if (newEntry.score > currentEntry.score) {
        leaderboard.splice(i, 0, newEntry);
        break;
      }
    }
    if (leaderboard.length > LEADERBOARD_MAX_LENGTH) {
      // TODO: 이것 import 한 변수에 재할당하는 것 고칠 필요가 있습니다. 
      // 아래 주석은 임시로 해두었습니다. 
      // eslint-disable-next-line no-import-assign
      leaderboard = leaderboard.slice(0, LEADERBOARD_MAX_LENGTH);
    }
    res.send('success');
    writeLeaderboard();
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: true,
      message: 'Invalid Request',
    });
  }
};

export { getLeaderboard, addLeaderboard };
