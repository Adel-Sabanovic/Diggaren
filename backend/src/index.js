import { SETTINGS } from "./settings";

import express from "express";

import { json } from "body-parser";

import { rootRouter } from "./routes";

import passport from "passport";

import {Strategy} from "passport-spotify";






const app = express();

app.use(json());

app.use(rootRouter);


passport.use(
    new Strategy(
      {
        clientID: '9e370704b5e644cc9b1bc011da337ed7',
        clientSecret: '1d97099a5fd64863b18a6d6298db2056',
        callbackURL: 'http://localhost:' + SETTINGS.PORT + "/" + SETTINGS.AUTH_CALLBACK_URL
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
          return done(null, {
              accessToken, refreshToken, expires_in
          });
      }
    )
);

app.use(passport.initialize());


app.listen(SETTINGS.PORT, () => console.log(`server started at http://localhost:${SETTINGS.PORT}/`));