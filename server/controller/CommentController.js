const Comments = require("../model/Comment");

class CommentController {
  async findById(req, res) {
    try {
      const { post_id } = req.params;

      const comments = await Comments.findById(post_id);

      return res.status(200).json(comments);
    } catch (error) {
      return console.log(error);
    }
  }

  async createNew(req, res) {
    try {
      const { body, post_id, user_id } = req.body;

      if (body == undefined || body == "") {
        return res.status(400).json({ error: "Body of comment cannot be undefined or empty" });
      }

      if (post_id == undefined || isNaN(post_id) || post_id == "") {
        return res.status(400).json({ error: "Post ID of comment cannot be undefined or empty" });
      }

      if (user_id == undefined || isNaN(user_id) || user_id == "") {
        return res.status(400).json({ error: "User ID of comment cannot be undefined or empty" });
      }

      await Comments.insertComment(body, post_id, user_id);

      return res.status(200).json({ success: "ok" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new CommentController();