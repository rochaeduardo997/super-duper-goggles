const knex = require("../database/connection");

class Post {
  async findPosts() {
    try {
      const result = await knex("tbl_posts")
        .select(["tbl_posts.id", "tbl_posts.title", "tbl_posts.slug", "tbl_posts.body", "tbl_posts.createdAt", "tbl_posts.updatedAt",
          "tbl_users.firstName", "tbl_users.lastName", "tbl_users.username"])
        .join("tbl_users", "tbl_posts.user_id", "=", "tbl_users.id");

      return result;
    } catch (error) {
      return console.error({ error });
    }
  }

  async findById(id) {
    try {
      const result = await knex("tbl_posts")
        .select(["tbl_posts.id", "tbl_posts.title", "tbl_posts.slug", "tbl_posts.body", "tbl_posts.createdAt", "tbl_posts.updatedAt",
          "tbl_users.firstName", "tbl_users.lastName", "tbl_users.username"])
        .join("tbl_users", "tbl_posts.user_id", "=", "tbl_users.id")
        .where({ "tbl_posts.id": id });

      return result;
    } catch (error) {
      console.error({ error });
    }
  }

  async insertPost(title, slug, body, user_id) {
    try {
      await knex("tbl_posts")
        .insert({
          title, slug, body, user_id
        });
    } catch (error) {
      return console.error({ error });
    }
  }

  async deleteById(id) {
    try {
      const result = await knex("tbl_posts")
        .delete()
        .where({ id: id });

      return result;
    } catch (error) {
      return console.log({ error });
    }
  }

  async updatePost(id, title, slug, body) {
    try {
      let postObject = {};

      if (title == undefined || title.length < 0) {
        return console.log({ error: "Title cannot be undefined or empty" });
      } else {
        postObject.title = title;
      }

      if (slug == undefined || slug.length < 0) {
        return console.log({ error: "Slug cannot be undefined or empty" });
      } else {
        postObject.slug = slug;
      }

      if (body == undefined || body.length < 0) {
        return console.log({ error: "Body cannot be undefined or empty" });
      } else {
        postObject.body = body;
      }

      await knex("tbl_posts")
        .update(postObject)
        .where({ id: id });
    } catch (error) {
      return console.error({ error });
    }
  }

  //only for tests
  async findPostByTitle(title) {
    try {
      const result = await knex("tbl_posts")
        .select("id")
        .where({ "title": title });

      return JSON.stringify(result).replace(/\D/g, "");
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = new Post();
