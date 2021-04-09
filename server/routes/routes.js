const express = require("express");

const app = express();
const router = express.Router();

const HomeController = require("../controller/HomeController");
const UserController = require("../controller/UserController");

//main page
router.get("/", HomeController.index);

//users
router.get("/users", UserController.index);
router.get("/user/:id", UserController.findById);
router.post("/user", UserController.createNew);
router.delete("/user/:id", UserController.deleteById);
router.put("/user/:id", UserController.updateUser);

module.exports = router;
