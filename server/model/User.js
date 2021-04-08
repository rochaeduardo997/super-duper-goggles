const bcrypt = require("bcrypt");

const knex = require("../database/connection");

class User{
  async findUsers(){
    try{
      const result = await knex.select(["id", "firstName", "lastName", "username", "email"]).from("tbl_users");
      return result;
    }catch(error){
      return console.error(error);
    }
  }

  async findById(id){
    try{
      const result = await knex.select(["id", "firstName", "lastName", "username", "email"]).from("tbl_users").where({ id: id });

      if(result.length > 0){
        return result;
      }
    }catch(error){
      return console.log(error);
    }
  }

  async insertUser(firstName, lastName, username, email, password){
    const hashPassword = await bcrypt.hash(password, 1);

    await knex.insert({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
      role: 0
    }).from("tbl_users");
  }

  async checkUsername(username){
    try{
      const result = await knex.select().from("tbl_users").where({ username: username });

      // console.log(result);

      if(result == ""){
        return false;
      }

      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  async checkEmail(email){
    try{
      const result = await knex.select().from("tbl_users").where({ email: email });

      // console.log(result);

      if(result == ""){
        return false;
      }

      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}

module.exports = new User();
