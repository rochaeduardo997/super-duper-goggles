const Comments = require("../model/Comment");

class CommentController {
  async index(req, res) {
    try {
      const comments = await Comments.findComments();

      return res.status(200).json(comments);
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = new CommentController();