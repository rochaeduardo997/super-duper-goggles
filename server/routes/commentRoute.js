const express = require("express");

const router = express.Router();

const CommentController = require("../controller/CommentController");

router.get("/comments", CommentController.index);

module.exports = router;