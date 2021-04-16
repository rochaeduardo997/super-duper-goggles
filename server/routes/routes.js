const express = require("express");
const app = express();

const UserRoute = require("./userRoute");
const PostRoute = require("./postRoute");
const CommentRoute = require("./commentRoute");

//users
app.use("/", UserRoute);

//posts
app.use("/", PostRoute);

// //comments
app.use("/", CommentRoute);

module.exports = app;
