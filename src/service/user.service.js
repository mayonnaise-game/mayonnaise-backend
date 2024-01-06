import { userMap } from "../globals";

const getCurrentUsers = (req, res, next) => {
  const { "user-uuid": userUuid } = req.cookies;
  if (!userUuid | !userMap.has(userUuid)) {
    // no uuid or not in current userMap
    res.status(401);
    res.json({
      error: true,
      message: "Invalid Request",
    });
    return;
  }
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
};

export { getCurrentUsers };
