const express = require("express");
const userRouter = require("./user");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === "options") res.send(200);
  else next();
});

app.use(
  "/api",
  createProxyMiddleware({ target: "http://localhost:8000", changeOrigin: true })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.listen(8000, () => {
  return `server is running at port 8000 success~~~`;
});
