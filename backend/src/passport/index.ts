import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user";

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, next) => {
      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (user) {
            console.log("User already exists: ", user);
            next(null, user);
          } else {
            User.create({
              username: profile.displayName,
              email: profile._json.email,
              profilePicURL: profile.photos![0].value,
              googleAuthId: profile.id,
            })
              .then((user) => {
                console.log("Created new user: ", user);
                next(null, user);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
