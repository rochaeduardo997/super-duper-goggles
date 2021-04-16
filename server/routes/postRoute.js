const express = require("express");

const router = express.Router();

const PostController = require("../controller/PostController");
const UserAuth = require("../middleware/UserAuth");


router.get("/posts", PostController.index);
router.get("/post/:id", PostController.findById);
router.post("/post", UserAuth, PostController.createNew);
router.delete("/post/:id", UserAuth, PostController.deleteById);
router.put("/post/:id", UserAuth, PostController.updatePost);

module.exports = router;