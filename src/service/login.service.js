import { v4 as uuidv4 } from "uuid";
import { userMap } from "../globals.js";

function login(req, res, next) {
  const uuid = uuidv4();
  const username = req.body.username;

  userMap.set(uuid, { username, score: 0, heart: 3 });

  const result = {
    data: {
      username,
      userUuid: uuid,
      lastMessageIndex: chats.startIndex + chats.data.length - 1,
    },
    message: "success",
  };

  try {
    res.setHeader("Content-Type", "application/json");
    // set cookie key as user-uuid, and value as uuid, domain is api.yoriquiz.site expires in 1 day

    res.cookie("user-uuid", uuid, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 year in this example)
      httpOnly: true, // this will set the HttpOnly flag
      secure: true, // this will set the Secure flag
      sameSite: "None",
      domain: ".yoriquiz.site",
      // expires: new Date(Date.now() + 86400000),
    });
    res.json(result);
  } catch (err) {
    console.error("Error while getting programming languages: ", err.message);
    next(err);
  }
}

export { login };
