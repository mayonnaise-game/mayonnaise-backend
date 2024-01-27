import { userMap } from "../globals.js";

function authUuid(userUuid) {
  if (!userUuid) {
    throw new Error("Uuid is empty.");
  }
  if (!userMap.has(userUuid)) {
    throw new Error("Uuid does not exist in current user list.");
  }
  return true;
}

export { authUuid };
