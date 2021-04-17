const Comments = require("../model/Comment");

class CommentController {
  async findById(req, res) {
    try {
      const { post_id } = req.params;

      const comments = await Comments.findById(post_id);

      if (comments.length <= 0) {
        return res.status(404).json({ error: "Post cannot be found or doesn\'t exists" });
      }

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

  async deleteById(req, res) {
    try {
      const { id } = req.params;

      if (id == undefined || id == "") {
        return res.status(400).json({ error: "ID cannot be undefined or empty" });
      }

      const result = await Comments.findCommentById(id);
      console.log(result)

      if (result === false) {
        return res.status(400).json({ error: "Comment cannot be found" });
      }

      await Comments.deleteById(id);

      return res.status(200).json({ success: "Comment has been deleted" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const { body } = req.body;

      if (id == undefined) {
        return res.status(400).json({ error: "ID cannot be undefined" });
      } else if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be a number" });
      }

      if (body == undefined || body == "") {
        return res.status(400).json({ error: "Body cannot be undefined or empty" });
      }

      await Comments.updateById(id, body);

      return res.status(200).json({ success: "Comment has been updated" });
    } catch (error) {
      return res.status(500).json({ error: "Something is wrong" });
    }
  }
}

module.exports = new CommentController();