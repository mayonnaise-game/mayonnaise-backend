import { userMap } from '../globals.js';
import { authUuid } from '../utils/auth.js';

const getCurrentUsers = (req, res, next) => {
  const { 'user-uuid': cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;

  try {
    authUuid(userUuid);

    const data = [];
    userMap.forEach((user, uuid) => {
      data.push({
        uuid,
        username: user.username,
        score: user.score,
        heart: user.heart,
        isCurrentUser: uuid === userUuid,
      });
    });
    data.sort((a, b) => b.score - a.score);
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

const getMyself = (req, res, next) => {
  const { 'user-uuid': cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;

  console.log('req.cookies', req.cookies);
  try {
    authUuid(userUuid);

    const user = userMap.get(userUuid);
    const data = {
      uuid: userUuid,
      username: user.username,
      score: user.score,
      heart: user.heart,
      isCurrentUser: true,
    };
    res.json({ data, message: 'success' });
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: JSON.stringify(err),
      message: 'Invalid Request',
    });
  }
};

export { getCurrentUsers, getMyself };
