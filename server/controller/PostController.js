const Post = require("../model/Post");

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
}

module.exports = new PostController();
