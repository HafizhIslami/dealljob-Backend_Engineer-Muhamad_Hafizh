const { comparePassword } = require("../helpers/bcrypt");
const { createToken, createRefreshToken } = require("../helpers/jsonwebtoken");
const UserModel = require("../models/users");

class UserController {
  static async registerNewUser(req, res, next) {
    try {
      const data = req.body;
      // console.log(!(data.role == "admin" || data.role == "user"));

      if (!data.username) throw { code: 400, error: "Username is required!" };
      else if (!data.email) throw { code: 400, error: "Email is required!" };
      else if (!data.password)
        throw { code: 400, error: "Password is required!" };
      else if (data.password.length < 5)
        throw { code: 400, error: "Password minimum length is 5" };
      else if (!data.role) throw { code: 400, error: "Role is required!" };
      else if (!(data.role == "admin" || data.role == "user"))
        throw { code: 400, error: "Role must be admin or user!" };
      const result = await UserModel.userCreateOne(data);
      res.status(201).json({
        message: `Registered as ${data.role} success with id: ${result.insertedId}`,
        _id: `${result.insertedId}`,
        id: result.id,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      });
      console.log(result.id);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.userFindOne({ username });
      console.log(user);
      if (!user) throw { code: 401, error: "Invalid email / password" };
      const validatePass = comparePassword(password, user.password);
      if (!validatePass) throw { code: 401, error: "Invalid email / password" };
      const payload = {
        id: user._id,
        email: user.email,
      };
      console.log(payload);
      const access_token = createToken(payload);
      const refresh_token = createRefreshToken(payload, "1d");

      // Assigning refresh token in http-only cookie
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        access_token,
        user_id: user.id,
        email: user.email,
        role: user.role,
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
      const { id } = req.user;

      const user = await UserModel.userFindOne({id});
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await UserModel.userDeleteById(id);
      if (result.deletedCount === 1) {
        res.status(200).json({
          ...result,
          message: `Successfully delete id ${id}`,
        });
      } else {
        throw { code: 404, error: "Failed delete by id, data not found" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const data = req.body;
      const { id } = req.user;
      const user = await UserModel.userFindOne({id});

      if (!user) throw { code: 404, error: "User Not Found!" };
      if (!data.username) throw { code: 400, error: "Username is required!" };
      else if (!data.email) throw { code: 400, error: "Email is required!" };
      else if (!data.password)
        throw { code: 400, error: "Password is required!" };
      else if (data.password.length < 5)
        throw { code: 400, error: "Password minimum length is 5" };
      else if (!data.role) throw { code: 400, error: "Role is required!" };
      else if (!(data.role == "admin" || data.role == "user"))
        throw { code: 400, error: "Role must be admin or user!" };
      const result = await UserModel.userUpdateOne(data, id);
      res.status(201).json({
        message: `Update data success with id: ${id}`,
        _id: id,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      });
    } catch (err) {
      next(err);
    }
  }

  // static async refresh(req, res, next) {
  //   try {
  //     if (req.cookies?.jwt) {
  //       // Destructuring refreshToken from cookie
  //       const refreshToken = req.cookies.jwt;

  //       // Verifying refresh token
  //       jwt.verify(
  //         refreshToken,
  //         process.env.REFRESH_TOKEN_SECRET,
  //         (err, decoded) => {
  //           if (err) {
  //             // Wrong Refesh Token
  //             return res.status(406).json({ message: "Unauthorized" });
  //           } else {
  //             // Correct token we send a new access token
  //             const accessToken = jwt.sign(
  //               {
  //                 username: userCredentials.username,
  //                 email: userCredentials.email,
  //               },
  //               process.env.ACCESS_TOKEN_SECRET,
  //               {
  //                 expiresIn: "10m",
  //               }
  //             );
  //             return res.json({ accessToken });
  //           }
  //         }
  //       );
  //     } else {
  //       return res.status(406).json({ message: "Unauthorized" });
  //     }
  //   } catch (error) {}
  // }
}

module.exports = UserController;
