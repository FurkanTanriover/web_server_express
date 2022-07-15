const express = require("express");
const app = express();
const userRouter = require("./router/user_router");
const homepageRouter = require("./router/homepage_router");

app.use(express.json());
app.use("/users", userRouter);
app.use("/", homepageRouter);

app.listen(3000, () => {
  console.log("server listen port 3000");
});
