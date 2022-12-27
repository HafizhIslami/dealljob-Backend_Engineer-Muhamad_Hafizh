const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class UserModel {
  static initDBCollectionUser() {
    const db = getDB();
    const userCollection = db.collection("Users");
    return userCollection;
  }

  static userCreateOne(data) {
    const user = {
      username: data.username,
      email: data.email,
      password: hashPassword(data.password),
      role: data.role,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
    return this.initDBCollectionUser().insertOne(user);
  }

  static userFindOne(id) {
    const _id = ObjectId(id);
    return this.initDBCollectionUser().findOne({ _id });
  }

  static userFindAll() {
    return this.initDBCollectionUser().find().toArray();
  }

  static userDeleteById(id) {
    const _id = ObjectId(id);
    return this.initDBCollectionUser().deleteOne({ _id });
  }
}

module.exports = UserModel;
