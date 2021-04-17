const express = require("express");

const router = express.Router();

const CommentController = require("../controller/CommentController");

const UserAuth = require("../middleware/UserAuth");

router.get("/comment/:post_id", CommentController.findById);
router.post("/comment", CommentController.createNew);
router.delete("/comment/:id", UserAuth, CommentController.deleteById);
router.put("/comment/:id", UserAuth, CommentController.updateById);

module.exports = router;