import { AsyncMiddleware } from "../utils/base";
import { BaseApiError } from "../utils/error";

export const isLoggedIn: AsyncMiddleware = async (req, res, next) => {
  console.log(req.user);
  if (req.user) return next();
  return next(new BaseApiError(401, "You are not logged in"));
};
