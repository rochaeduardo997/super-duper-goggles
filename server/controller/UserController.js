const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "thisisasecretok";

const User = require("../model/User");

class UserController {
  async index(req, res) {
    try {
      const users = await User.findUsers();

      if (users.length > 1) {
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

      if (firstName == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for firstName" });
      }

      if (!isNaN(lastName)) {
        return res.status(400).json({ status: false, error: "Last name cannot be a number" });
      }

      if (username == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for username" });
      }

      if (checkUsername) {
        return res.status(400).json({ status: false, error: "Username already been used" });
      }

      if (email == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for email" });
      }

      if (checkEmail) {
        return res.status(400).json({ status: false, error: "Email already been used" });
      }

      if (password == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for password" });
      }

      if (role != -1) {
        role = 0;
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
      const { firstName, lastName, username, email } = req.body;

      const checkUsername = await User.checkUsername(username);
      const checkEmail = await User.checkEmail(email);

      if (firstName == undefined && firstName == " " && isNaN(firstName)) {
        return res.status(400).json({ status: false, error: "First name cannot be empty or a number" });
      }

      if (!isNaN(lastName)) {
        return res.status(400).json({ status: false, error: "Last name cannot be a number" });
      }

      if (username == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for username" });
      }

      if (checkUsername) {
        return res.status(400).json({ status: false, error: "Username already been used" });
      }

      if (email == undefined) {
        return res.status(400).json({ status: false, error: "Invalid input for email" });
      }

      if (checkEmail) {
        return res.status(400).json({ status: false, error: "Email already been used" });
      }

      await User.updateUser(id, firstName, lastName, username, email);

      console.log({ status: true, "success": "User has been updated" });
      return res.status(200).json({ status: true, success: "User has been updated" });
    } catch (error) {
      console.log({ status: false, "error": error });
      return res.status(500).json({ status: false, error: "Something is wrong" });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    const userFoundByEmail = await User.findByEmail(email);

    if (userFoundByEmail != false) {
      const passwordMatch = await bcrypt.compare(password, userFoundByEmail.password);
      // console.log(passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign({ email: userFoundByEmail.email, role: userFoundByEmail.role }, secret);
        return res.status(200).json({
          success: passwordMatch,
          token: token
        });
      } else {
        return res.status(401).json({
          error: "Password don\'t match"
        });
      }
    }
  }
}

module.exports = new UserController();
