# oauth-with-express

## Concept

Social login is a 2 step communication.

- Show consent screen to the user, if user accepts then auth provider sends a token
- We ask for user info with that token and the auth provider gives the user info
- Then we save the required info if user is signing up and complete the user registeration or else in case login, we just log the user in the app

## Getting started

`.env` file example

```.env
MONGODB_CONNECT_URL=

GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

COOKIE_SESSION_SECRET=
```
