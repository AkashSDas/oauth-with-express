"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_1 = require("../models/user");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, next) => {
    user_1.User.findOne({ email: profile._json.email })
        .then((user) => {
        if (user) {
            console.log("User already exists: ", user);
            next(null, user);
        }
        else {
            user_1.User.create({
                username: profile.displayName,
                email: profile._json.email,
                profilePicURL: profile.photos[0].value,
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
}));
//# sourceMappingURL=index.js.map