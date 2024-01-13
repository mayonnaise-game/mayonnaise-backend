import { userMap } from "../globals.js";
import { authUuid } from "../utils/auth.js";

const USER_TIMEOUT = 30000; // 30 sec.

const getCurrentUsers = (req, res, next) => {
  const { "user-uuid": cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;

  try {
    authUuid(userUuid);

    const currentUsers = [];
    const currentTime = new Date().getTime();
    for (const [uuid, userInfo] of userMap) {
      // remove timeout users
      if (userInfo.lastUpdated - currentTime > USER_TIMEOUT) {
        userMap.delete(uuid); // safe to delete while iterating!
      } else {
        currentUsers.push({
          uuid,
          username: user.username,
          score: user.score,
          heart: user.heart,
          isCurrentUser: uuid === userUuid,
        });
      }
    }

    currentUsers.sort((a, b) => b.score - a.score);
    res.json({ data: currentUsers, message: "success" });
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: true,
      message: "Invalid Request",
    });
  }
};

const getMyself = (req, res, next) => {
  const { "user-uuid": cookieUuid } = req.cookies;
  const userUuid = cookieUuid ?? req.query.userUuid;

  console.log("req.cookies", req.cookies);
  try {
    authUuid(userUuid);

    const currentTime = new Date().getTime();
    const user = userMap.get(userUuid);
    user.lastUpdated = currentTime; // update when user requested it's info
    const data = {
      uuid: userUuid,
      username: user.username,
      score: user.score,
      heart: user.heart,
      isCurrentUser: true,
    };
    res.json({ data, message: "success" });
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json({
      error: JSON.stringify(err),
      message: "Invalid Request",
    });
  }
};

export { getCurrentUsers, getMyself };
