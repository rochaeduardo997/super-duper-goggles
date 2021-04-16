const knex = require("../database/connection");

class Comments {
  async findComments() {
    try {
      const result = await knex("tbl_comments")
        .select(["tbl_comments.id", "tbl_comments.body",
          "tbl_posts.title", "tbl_posts.slug",
          "tbl_users.username"])
        .join("tbl_posts", "tbl_posts.id", "=", "tbl_comments.post_id")
        .join("tbl_users", "tbl_users.id", "=", "tbl_comments.user_id");

      return result;
    } catch (error) {
      return console.log({ error });
    }
  }
}

module.exports = new Comments();