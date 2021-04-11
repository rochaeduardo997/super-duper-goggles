const Post = require("../model/Post");

class PostController{
  async index(req, res){
    try{
      const result = await Post.findPosts();

      res.json({result});
    }catch(error){
      return res.status(400).json(error);
    }
  }
}

module.exports = new PostController();
