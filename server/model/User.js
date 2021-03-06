const bcrypt = require("bcrypt");

const knex = require("../database/connection");

class User {
  async findUsers() {
    try {
      const result = await knex.select(["id", "firstName", "lastName", "username", "email", "role", "createdAt", "updatedAt"]).from("tbl_users");
      return result;
    } catch (error) {
      return console.error({
        "error": error
      });
    }
  }

  async findById(id) {
    try {
      const result = await knex("tbl_users").select(["id", "firstName", "lastName", "username", "email", "role"]).where({ id: id });

      if (result.length > 0) {
        return result;
      }
    } catch (error) {
      return console.log({
        "error": error
      });
    }
  }

  async findByEmail(email) {
    try {
      const result = await knex.select(["id", "firstName", "lastName", "username", "email", "password", "role"]).table("tbl_users").where({ email: email });

      if (result.length > 0) {
        return result[0];
      } else {
        return false;
      }
    } catch (error) {
      return console.log({
        "error": error
      });
    }
  }

  async insertUser(firstName, lastName, username, email, password, role) {
    try {
      const hashPassword = await bcrypt.hash(password, 1);

      await knex.insert({
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        role: role
      }).from("tbl_users");
    } catch (error) {
      console.log({
        "error": error
      });
    }
  }

  async deleteById(id) {
    try {
      const result = knex.delete().where({ id: id }).table("tbl_users");

      return result;
    } catch (error) {
      return console.error({ "error": error });
    }
  }

  async updateUser(id, firstName, lastName, role) {
    try {
      let userObject = {}

      if (firstName != "" && firstName != undefined && isNaN(firstName)) {
        userObject.firstName = firstName;
      } else {
        return console.log({
          "error": "First name cannot be empty or a number"
        });
      }

      if (isNaN(lastName)) {
        userObject.lastName = lastName;
      } else {
        return console.log({
          "error": "Last name cannot be a number"
        });
      }

      // const resultUsername = await this.checkUsername(username);
      // console.log(resultUsername);

      // if (!resultUsername) {
      //   if (username != "" && isNaN(username)) {
      //     userObject.username = username;
      //   } else {
      //     return console.log({
      //       "error": "Username cannot be empty or a number"
      //     });
      //   }
      // } else {
      //   return console.log({
      //     "error": "Username already in use"
      //   });
      // }

      // const resultEmail = await this.checkEmail(email);

      // if (!resultEmail) {
      //   if (email != "" && isNaN(email)) {
      //     userObject.email = email;
      //   } else {
      //     return console.log({
      //       "error": "Email cannot be empty or a number"
      //     });
      //   }
      // } else {
      //   return console.log({
      //     "error": "Email already in use"
      //   });
      // }

      if (role < 0 || role > 1) {
        return console.log({ error: "Role cannot be lowest 0 or greatest 1" });
      } else {
        // console.log(role);
        userObject.role = role;
      }

      const result = await knex.update(userObject).table("tbl_users").where({ id: id });

      return result;
    } catch (error) {
      console.log({
        "error": error
      });
    }
  }

  async checkUsername(username) {
    try {
      const result = await knex.select("id").from("tbl_users").where({ username: username });

      if (result == "") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log({ "error": error });
      return false;
    }
  }

  //only for tests
  async returnIdFromUsername(username) {
    try {
      const result = await knex("tbl_users").select("id").where({ username: username });

      return JSON.stringify(result).replace(/\D/g, "");
    } catch (error) {
      return console.log({ error });
    }
  }

  async checkEmail(email) {
    try {
      const emailResult = await knex.select().from("tbl_users").where({ email: email });

      // console.log(emailResult);

      if (emailResult == "") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log({
        "error": error
      });
      return false;
    }
  }
}

module.exports = new User();
