const express = require("express");
const router = express.Router();
const url = require("url");

module.exports = server => {
  router.post("/auth/login", (req, res, next) => {
    let users = server.db.getState().users,
      matchedUser = users.find(user => {
        return Buffer.from(`${user.email}|${user.password}`).toString("base64") === req.body.token;
      });

    if (matchedUser) {
      res.json(matchedUser);
    } else {
      res.status(401).send("Can't find user with those credentials");
    }
  });

  router.post("/auth/userinfo", (req, res, next) => {
    let users = server.db.getState().users,
      matchedUser = users.find(user => {
        return user.fakeToken === req.body.token; //('Authorization');
      });

    if (!matchedUser) {
      res.status(401).send("Unauthorized");
    } else {
      res.json(matchedUser);
    }
  });

  return router;
};
