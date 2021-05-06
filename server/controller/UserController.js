const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "thisisasecretok";

const User = require("../model/User");

class UserController {
  async index(req, res) {
    try {
      const users = await User.findUsers();

      if (users.length >= 1) {
        console.log({ "success": "Users has be found" });

        return res.status(200).json({ status: true, users });
      }

      return res.status(400).json({ status: false, error: "Users cannot be found" });
    } catch (error) {
      console.error({ "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      // console.log(id);

      if (id == undefined || isNaN(id)) {
        return res.status(400).json({ status: false, error: "Invalid id" });
      }

      const userById = await User.findById(id);

      if (JSON.stringify(userById) == undefined) {
        return res.status(404).json({ status: false, error: "User cannot be found by id" });
      }

      console.log({ "success": "User has be found by id" });
      return res.json({ status: true, userById });
    } catch (error) {
      console.log({ status: false, "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong", });
    }
  }

  async createNew(req, res) {
    try {
      const { firstName, lastName, username, email, password, role } = req.body;

      const checkUsername = await User.checkUsername(username);
      const checkEmail = await User.checkEmail(email);
      // console.log(checkUsername);
      // console.log(checkEmail);

      if (firstName == undefined || firstName == "" || firstName == " ") {
        return res.status(400).json({ status: false, error: "Invalid first name" });
      }

      if (typeof (lastName) != "string") {
        return res.status(400).json({ status: false, error: "Last name cannot be a number" });
      }

      if (username == undefined || username == "" || username == " ") {
        return res.status(400).json({ status: false, error: "Invalid username" });
      }

      if (checkUsername) {
        return res.status(400).json({ status: false, error: "Username already been used" });
      }

      if (email == undefined || email == "" || email == " ") {
        return res.status(400).json({ status: false, error: "Invalid email" });
      }

      if (checkEmail) {
        return res.status(400).json({ status: false, error: "Email already been used" });
      }

      if (password == undefined || password == "" || password == " ") {
        return res.status(400).json({ status: false, error: "Invalid password" });
      }

      await User.insertUser(firstName, lastName, username, email, password, role);

      res.status(200).json({ status: true, success: "User has been registered" });

      return console.log({ status: true, success: "User has been registered" });
    } catch (error) {
      console.log({ "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const userById = await User.findById(id);

      if (id == undefined || isNaN(id)) {
        return res.status(400).json({ status: false, error: "Invalid id" });
      }

      if (JSON.stringify(userById) == undefined) {
        return res.status(404).json({ status: false, error: "User cannot be found", });
      }

      User.deleteById(id);

      console.log({ "success": "User has been deleted" });
      return res.status(200).json({ status: true, success: "User has been deleted" });
    } catch (error) {
      console.log({ "status": false, "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong", });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, role } = req.body;

      const testLastName = lastName >= 0 ? 0 : "String";

      // console.log(typeof (testLastName));

      // const checkUsername = await User.checkUsername(username);
      // const checkEmail = await User.checkEmail(email);

      if (firstName == undefined && firstName == " " && isNaN(firstName)) {
        return res.status(400).json({ status: false, error: "First name cannot be empty or a number" });
      }

      if (!isNaN(testLastName)) {
        return res.status(400).json({ status: false, error: "Last name cannot be a number" });
      }

      // if (username == undefined) {
      //   return res.status(400).json({ status: false, error: "Invalid input for username" });
      // }

      // if (checkUsername) {
      //   return res.status(400).json({ status: false, error: "Username already been used" });
      // }

      // if (email == undefined) {
      //   return res.status(400).json({ status: false, error: "Invalid input for email" });
      // }

      // if (checkEmail) {
      //   return res.status(400).json({ status: false, error: "Email already been used" });
      // }

      if (role == undefined || role < 0 || role > 1) {
        return res.status(400).json({ status: false, error: "Invalid role" });
      }

      await User.updateUser(id, firstName, lastName, role);

      console.log({ status: true, "success": "User has been updated" });
      return res.status(200).json({ status: true, success: "User has been updated" });
    } catch (error) {
      console.log({ status: false, "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const userFoundByEmail = await User.findByEmail(email);

      if (userFoundByEmail != false) {
        const passwordMatch = await bcrypt.compare(password, userFoundByEmail.password);
        // console.log(passwordMatch);

        if (passwordMatch) {
          const token = jwt.sign({ id: userFoundByEmail.id, email: userFoundByEmail.email, role: userFoundByEmail.role }, secret);
          return res.status(200).json({ status: true, success: passwordMatch, token: token });
        } else {
          return res.status(401).json({ status: false, error: "Email/Password don\'t match" });
        }
      } else {
        return res.status(401).json({ status: false, error: "Email/Password don\'t match" });
      }
    } catch (error) {
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }

  async validateToken(req, res) {
    console.log(req.id);
    return res.status(200).json({ id });
  }

  async validateUserToken(req, res) {
    console.log(req.id);
    return res.status(200).json({ id });
  }
}

module.exports = new UserController();
