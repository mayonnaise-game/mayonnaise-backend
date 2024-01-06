import { userMap } from "../globals.js";
import { authUuid } from "../utils/auth.js";

const getCurrentUsers = (req, res, next) => {
  const { "user-uuid": userUuid } = req.cookies;
  try {
    authUuid(userUuid);

    const data = [];
    for (const [uuid, user] of userMap) {
      data.push({
        uuid,
        username: user.username,
        score: user.score,
        heart: user.heart,
        isCurrentUser: uuid === userUuid,
      });
    }
    res.json({ data, message: "success" });
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
  const { "user-uuid": userUuid } = req.cookies;
  try {
    authUuid(userUuid);

    const user = userMap(userUuid);
    const data = {
      userUuid,
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
      error: true,
      message: "Invalid Request",
    });
  }
};

export { getCurrentUsers, getMyself };
