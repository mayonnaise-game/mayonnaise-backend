import { v4 as uuidv4 } from "uuid";
import { userMap } from "../globals.js";

function login(req, res, next) {
  const uuid = uuidv4();
  const username = req.body.username;

  userMap.set(uuid, { username });

  const result = {
    data: {
      username,
      userUuid: uuid,
    },
    message: "success",
  };

  try {
    res.setHeader("Content-Type", "application/json");
    // set cookie key as user-uuid, and value as uuid, domain is api.yoriquiz.site expires in 1 day

    res.cookie("user-uuid", uuid, {
      domain: "api.yoriquiz.site",
      expires: new Date(Date.now() + 86400000),
      sameSite: "none",
      secure: true,
    });
    res.json(result);
  } catch (err) {
    console.error("Error while getting programming languages: ", err.message);
    next(err);
  }
}

export { login };
