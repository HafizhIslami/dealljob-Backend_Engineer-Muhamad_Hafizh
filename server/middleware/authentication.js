const { verifyToken } = require("../helpers/jsonwebtoken.js");
const UserModel = require("../models/users");


const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { code: 401, error: "Please login" };
    let payload = verifyToken(access_token);
    let user = await UserModel.userFindOne(payload.id);
    if (!user) throw { name: "Unauthorized", error: "User not found" };
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
};
