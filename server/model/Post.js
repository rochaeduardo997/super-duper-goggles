const knex = require("../database/connection");

class Post {
  async findPosts() {
    try{
      const result = await knex("tbl_posts")
        .select([
          "tbl_posts.id", "tbl_posts.title", "tbl_posts.slug", "tbl_posts.body", "tbl_posts.createdAt", "tbl_posts.updatedAt",
          "tbl_users.firstName", "tbl_users.lastName", "tbl_users.username"
        ])
        .join("tbl_users", "tbl_posts.user_id", "=", "tbl_users.id");

      return result;
    }catch(error){
      return console.log({ error: error });
    }
  }
}

module.exports = new Post();
