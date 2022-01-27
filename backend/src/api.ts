import cors from "cors";
import express from "express";
import { responseMsg } from "./utils/base";
import passport from "passport";
import cookieSession from "cookie-session";
import "./passport";
import { router as authRouter } from "./routes/auth";

// App
export const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_SECRET],
  })
);
app.use(passport.session());

// Test api route
app.get("/api/test", (_, res) => res.status(200).send("Hello mom"));

// Routes
app.use("/api/auth", authRouter);
app.all("*", (req, res) => {
  responseMsg(res, {
    statusCode: 404,
    isError: true,
    msg: `Cannot find ${req.originalUrl} on this server!`,
  });
});
