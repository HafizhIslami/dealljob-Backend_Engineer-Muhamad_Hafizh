const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class UserModel {
  static initDBCollectionUser() {
    const db = getDB();
    const userCollection = db.collection("Users");
    return userCollection;
  }

  static async userCreateOne(data) {
    let dataLength = await this.initDBCollectionUser().find().toArray();
    // console.log(info.length);
    const user = {
      username: data.username,
      id: dataLength.length + 1,
      email: data.email,
      password: hashPassword(data.password),
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.initDBCollectionUser().insertOne(user);
  }

  static userFindOne(value) {
    if (value.username)
      return this.initDBCollectionUser().findOne({ username: value.username });
    else
      return this.initDBCollectionUser().findOne({ _id: ObjectId(value.id) });
  }

  static userFindAll() {
    return this.initDBCollectionUser().find().toArray();
  }

  static userDeleteById(id) {
    const _id = ObjectId(id);
    return this.initDBCollectionUser().deleteOne({ _id });
  }

  static async userUpdateOne(data, id) {
    const _id = ObjectId(id);
    const updateData = {
      $set: {
        email: data.email,
        password: hashPassword(data.password),
        role: data.role,
        updatedAt: new Date(),
      },
    };
    return this.initDBCollectionUser().updateOne({ _id }, updateData);
  }
}

module.exports = UserModel;
