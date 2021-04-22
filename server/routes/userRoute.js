const express = require("express");

const router = express.Router();

const UserController = require("../controller/UserController");

const AdminAuth = require("../middleware/AdminAuth");


router.get("/users", AdminAuth, UserController.index);
router.get("/user/:id", AdminAuth, UserController.findById);
router.post("/user", UserController.createNew);
router.delete("/user/:id", AdminAuth, UserController.deleteById);
router.put("/user/:id", AdminAuth, UserController.updateUser);
router.post("/login", UserController.loginUser);
router.post("/validate", AdminAuth, UserController.validateToken);

module.exports = router;
