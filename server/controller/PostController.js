const Post = require("../model/Post");
const User = require("../model/User");

class PostController{
  async index(req, res){
    try{
      const result = await Post.findPosts();

      res.json({result});
    }catch(error){
      return res.status(500).json(error);
    }
  }

  async findById(req, res) {
    try{
      const { id } = req.params;

      if(id == undefined || isNaN(id)){
        return res.status(400).json({ error: "Invalid id" });
      }

      const postById = await Post.findById(id);

      if(JSON.stringify(postById) == undefined){
        return res.status(404).json({ error: "Post cannot be found" });
      }

      console.log({ success: "Post has be found by id" });

      return res.status(200).json(postById);
    }catch(error){
      return res.status(500).json(error);
    }
  }

  async createNew(req, res) {
    try{
      const { title, slug, body, user_id } = req.body;

      if(title == undefined || title == ""){
        return res.status(400).json({ error: "Title cannot be undefined or empty" });
      }
      if(slug == undefined || slug == ""){
        return res.status(400).json({ error: "Slug cannot be undefined or empty" });
      }
      if(body == undefined || body == ""){
        return res.status(400).json({ error: "Body cannot be undefined or empty" });
      }
      if(user_id == undefined || user_id == ""){
        return res.status(400).json({ error: "User id cannot be undefined or empty" });
      }

      const userById = await User.findById(user_id);
      if(userById == undefined || userById == []){
        return res.status(404).json({ error: "User cannot be found" });
      }

      await Post.insertPost(title, slug, body, user_id);
      console.log({ success: "Post has been created" });

      return res.status(200).json({ success: "Post has been created" });
    }catch(error){
      return res.status(500).json({ error });
    }
  }
}

module.exports = new PostController();
