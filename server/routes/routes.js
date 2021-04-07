const express = require("express");

const app = express();
const router = express.Router();

const HomeController = require("../controller/HomeController");
const UserController = require("../controller/UserController");

//main page
router.get("/", HomeController.index);

//users
router.get("/users", UserController.index);
router.post("/users", UserController.createNew);

module.exports = router;
