const express = require("express");

const app = express();
const router = express.Router();

const HomeController = require("../controller/HomeController");
const UserController = require("../controller/UserController");
const PostController = require("../controller/PostController");
const AdminAuth = require("../middleware/AdminAuth");

//main page
router.get("/", HomeController.index);

//users
router.get("/users", AdminAuth, UserController.index);
router.get("/user/:id", AdminAuth, UserController.findById);
router.post("/user", AdminAuth, UserController.createNew);
router.delete("/user/:id", AdminAuth, UserController.deleteById);
router.put("/user/:id", AdminAuth, UserController.updateUser);
router.post("/login", UserController.loginUser);

//posts
router.get("/posts", PostController.index);
router.get("/post/:id", PostController.findById);
router.post("/post", PostController.createNew);

module.exports = router;
