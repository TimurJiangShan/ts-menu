const express = require("express");

const Router = express.Router();

Router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    return res.json({
      code: 200,
      msg: "Login Success",
    });
  } else {
    return res.json({
      code: 400,
      msg: "Username or password error",
    });
  }
});
module.exports = Router;
