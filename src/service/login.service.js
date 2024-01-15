import { v4 as uuidv4 } from "uuid";
import { userMap, chats } from "../globals.js";

function login(req, res, next) {
  const uuid = uuidv4();
  const username = req.body.username;

  const currentTime = new Date().getTime();
  userMap.set(uuid, { username, score: 0, heart: 3, lastUpdated: currentTime });

  const result = {
    data: {
      username,
      userUuid: uuid,
      lastMessageIndex: chats.startIndex + chats.data.length - 1,
    },
    message: "success",
  };

  try {
    // res.cookie("user-uuid", uuid, {
    //   maxAge: 60 * 60 * 1000, // expires in 1 hour
    //   httpOnly: true, // this will set the HttpOnly flag
    //   secure: true, // this will set the Secure flag
    //   sameSite: "None",
    //   domain: ".yoriquiz.site",
    // });

    res.json(result);
  } catch (err) {
    console.error("Error while getting programming languages: ", err.message);
    next(err);
  }
}

export { login };
