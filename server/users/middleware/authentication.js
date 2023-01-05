const { verifyToken } = require("../helpers/jsonwebtoken.js");
const UserModel = require("../models/users");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { code: 401, error: "Please login" };
    let payload = verifyToken(access_token);
    // console.log(payload);
    let user = await UserModel.userFindOne({id: payload.id});
    if (!user) throw { name: "Unauthorized", error: "User not found" };
    if (user.role === 'user' && !(req.method === 'GET' && req.url === '/users/profile'))
    throw {code : 403, error: "Only admin can access this site"}
    console.log(req.method, user, req.url);

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = {
  authentication,
};
