const { User } = require("../models");

const { hashPassword, verifyPassword } = require("../helpers/bcrypt");
const { generateJWToken } = require("../helpers/jwt");
class userController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const hash = hashPassword(password);
      const newUser = await User.create({ email, name, password: hash });

      res.status(201).json({ status: "success", data: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "bad input", message: "Email cannot be empty!" };
      }

      if (!password) {
        throw { name: "bad input", message: "Password cannot be empty!" };
      }

      const userData = await User.findOne({ where: { email } });

      if (!userData || !verifyPassword(password, foundUser.password)) {
        throw {
          name: "login fail",
          message: "Invalid email/password",
        };
      }

      const access_token = generateJWToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
      });

      res.status(200).json({ status: "success", data: { access_token } });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
