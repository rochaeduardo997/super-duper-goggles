const User = require("../model/User");

class UserController {
  async index(req, res) {
    try{
      const users = await User.findUsers();
      console.log(users);

      return res.status(200).json(users);
    }catch(error){
      console.error(error);
      return res.status(500).json({
        error: "Something is wrong",
      });
    }
  }

  async findById(req, res) {
    const { id } = req.params;

    // console.log(id);

    if(id == undefined){
      return res.status(400).json({
        error: "Invalid id"
      })
    }

    const userById = await User.findById(id);

    if(JSON.stringify(userById) == undefined){
      return res.status(404).json({
        error: "Id not found"
      });
    }

    console.log(userById);
    return res.json({
      userById
    })
  }

  async createNew(req, res) {
    try{
      const { firstName, lastName, username, email, password } = req.body;

      const checkUsername = await User.checkUsername(username);
      const checkEmail = await User.checkEmail(email);
      console.log(checkUsername);
      console.log(checkEmail);

      if(firstName == undefined){
        return res.status(400).json({
          error: "Invalid input for firstName"
        });
      }
      if(username == undefined ){
        return res.status(400).json({
          error: "Invalid input for username"
        });
      }
      if(checkUsername){
        return res.status(400).json({
          error: "Username already been used"
        });
      }
      if(email == undefined){
        return res.status(400).json({
          error: "Invalid input for email"
        });
      }
      if(checkEmail){
        return res.status(400).json({
          error: "Email already been used"
        });
      }
      if(password == undefined){
        return res.status(400).json({
          error: "Invalid input for password"
        });
      }

      await User.insertUser(firstName, lastName, username, email, password);

      res.status(200).json({
        success: "User has been registered"
      });
      return console.log("success: User has been registered");
    }catch(error){
      console.log(error);
      return res.status(500).json({
        error: "Something is wrong",
      })
    }
  }
}

module.exports = new UserController();
