const Post = require("../model/Post");
const User = require("../model/User");

class PostController {
  async index(req, res) {
    try {
      const result = await Post.findPosts();

      return res.json({ status: true, result });
    } catch (error) {
      return res.status(500).json({ status: true, error });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      if (id == undefined || isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const postById = await Post.findById(id);

      if (JSON.stringify(postById) == undefined) {
        return res.status(404).json({ error: "Post cannot be found" });
      }

      console.log({ status: true, success: "Post has be found by id" });

      return res.status(200).json({ status: true, postById });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createNew(req, res) {
    try {
      const { title, slug, body, user_id } = req.body;

      if (title == undefined || title == "") {
        return res.status(400).json({ error: "Title cannot be undefined or empty" });
      }
      if (slug == undefined || slug == "") {
        return res.status(400).json({ error: "Slug cannot be undefined or empty" });
      }
      if (body == undefined || body == "") {
        return res.status(400).json({ error: "Body cannot be undefined or empty" });
      }
      if (user_id == undefined || user_id == "") {
        return res.status(400).json({ error: "User id cannot be undefined or empty" });
      }

      const userById = await User.findById(user_id);
      if (userById == undefined || userById == []) {
        return res.status(404).json({ error: "User cannot be found" });
      }

      await Post.insertPost(title, slug, body, user_id);
      console.log({ success: "Post has been created" });

      return res.status(200).json({ status: true, success: "Post has been created" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async deleteById(req, res) {
    const { id } = req.params;

    const postById = await Post.findById(id);

    if (isNaN(id)) {
      return res.status(400).json({ status: false, error: "Id must be a number" });
    }

    if (postById.length <= 0) {
      return res.status(404).json({ status: false, error: "Post not found" });
    }

    const result = await Post.deleteById(id);

    return res.status(200).json({ status: true, success: "Post has been deleted" });
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, slug, body } = req.body;

      const postExists = await Post.findById(id);

      if (isNaN(id)) {
        return res.status(400).json({ status: false, error: "Id must be a number" });
      } else if (!(postExists.length > 0)) {
        return res.status(400).json({ status: false, error: "Post cannot be found" });
      }

      if (title == undefined || title == "") {
        return res.status(400).json({ status: false, error: "Title cannot be undefined or empty" });
      }

      if (slug == undefined || slug == "" || slug.length > 10) {
        return res.status(400).json({ status: false, error: "Slug cannot be undefined or empty" });
      }

      if (body == undefined || body == "") {
        return res.status(400).json({ status: false, error: "Body cannot be undefined or empty" });
      }

      await Post.updatePost(id, title, slug, body);

      return res.status(200).json({ status: true, success: "Post has been updated" });
    } catch (error) {
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }
}

module.exports = new PostController();
