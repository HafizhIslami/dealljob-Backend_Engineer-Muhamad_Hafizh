const UserModel = require("../models/users");

class UserController {
  static async registerNewUser(req, res, next) {
    try {
      const data = req.body;
      data.role = "Admin";

      if (!data.username) throw { code: 400, error: "Username is required!" };
      else if (!data.email) throw { code: 400, error: "Email is required!" };
      else if (!data.password)
        throw { code: 400, error: "Password is required!" };
      else if (data.password.length < 5)
        throw { code: 400, error: "Password minimum length is 5" };
      else if (!data.phoneNumber)
        throw { code: 400, error: "Phonenumber is required!" };
      else if (!data.address)
        throw { code: 400, error: "Address is required!" };
      const result = await UserModel.userCreateOne(data);
      res.status(201).json({
        message: `A document was inserted with the _id: ${result.insertedId}`,
        _id: `${result.insertedId}`,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.userFindAll();
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getDetailUser(req, res, next) {
    try {
      const id = req.params.id;

      const user = await UserModel.userFindOne(id);
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;

      const result = await UserModel.userDeleteById(id);
      if (result.deletedCount === 1) {
        res.status(200).json({
          ...result,
          message: "Successfully delete by id",
        });
      } else {
        throw { code: 404, error: "Failed delete by id, data not found" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
