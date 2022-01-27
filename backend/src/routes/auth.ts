import { Router } from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/auth";
import { responseMsg } from "../utils/base";

export const router = Router();

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    return responseMsg(res, {
      statusCode: 200,
      isError: false,
      msg: "Google OAuth initialized",
    });
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, Please try again",
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "http://localhost:3000/login/error",
  }),
  (req, res) => {
    return responseMsg(res, {
      statusCode: 200,
      isError: false,
      msg: "Google callback",
      data: { user: req.user },
    });
  }
);

router.get("/user", isLoggedIn, (req, res) => {
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Logged in user info",
    data: { user: req.user },
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  return responseMsg(res, {
    statusCode: 200,
    isError: false,
    msg: "Successfully logged out",
  });
});
