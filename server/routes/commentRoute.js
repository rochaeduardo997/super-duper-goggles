const express = require("express");

const router = express.Router();

const CommentController = require("../controller/CommentController");

router.get("/comment/:post_id", CommentController.findById);
router.post("/comment", CommentController.createNew);
router.delete("/comment/:id", CommentController.deleteById);

module.exports = router;