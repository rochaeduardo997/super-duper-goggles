const knex = require("../database/connection");

class Comments {
  async findById(post_id) {
    try {
      const result = await knex("tbl_comments")
        .select(["tbl_comments.id", "tbl_comments.body", "tbl_comments.createdAt", "tbl_comments.updatedAt",
          "tbl_users.username"])
        .join("tbl_posts", "tbl_posts.id", "=", "tbl_comments.post_id")
        .join("tbl_users", "tbl_users.id", "=", "tbl_comments.user_id")
        .where({ "tbl_posts.id": post_id });

      return result;
    } catch (error) {
      return console.log({ error });
    }
  }

  async insertComment(body, post_id, user_id) {
    try {
      const commentObject = {};

      if (body == undefined || body == "") {
        return console.log({ error: "Body cannot be undefined or empty" });
      } else {
        commentObject.body = body;
      }

      if (post_id === false) {
        return console.log({ error: "Post ID cannot be undefined or empty" });
      } else {
        commentObject.post_id = post_id;
      }

      if (user_id === false) {
        return console.log({ error: "User ID cannot be undefined or empty" });
      } else {
        commentObject.user_id = user_id;
      }

      await knex("tbl_comments")
        .insert(commentObject);
    } catch (error) {
      return console.error({ error });
    }
  }

  async deleteById(id) {
    try {
      const result = await knex("tbl_comments")
        .delete()
        .where({ "id": id });

      return result;
    } catch (error) {
      return console.error({ error });
    }
  }

  async updateById(id, body) {
    try {
      if (id == undefined) {
        return console.log({ error: "Comment ID cannot be undefined" });
      } else if (isNaN(id)) {
        return console.log({ error: "Comment ID must be a number" });
      }

      if (body == undefined || body == "") {
        return console.log({ error: "Comment body cannot be undefined or empty" });
      }

      await knex("tbl_comments")
        .update({ "body": body })
        .where({ "id": id });

      return console.log("Comment has been successful updated");
    } catch (error) {
      return console.error({ error });
    }
  }

  async findCommentById(id) {
    try {
      const result = await knex("tbl_comments")
        .select()
        .where({ "id": id });

      if (result.length > 0) {
        return true
      }

      return false;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  async findCommentByIdAndEmail(id, email) {
    try {
      const result = await knex("tbl_comments")
        .select()
        .join("tbl_users", "tbl_users.id", "=", "tbl_comments.user_id")
        .where({ "tbl_users.email": email, "tbl_comments.id": id });

      if (result.length <= 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }
}

module.exports = new Comments();
