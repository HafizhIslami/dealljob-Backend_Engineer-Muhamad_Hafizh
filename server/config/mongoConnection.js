const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = ""
const client = new MongoClient(url);
let dbConnection;

async function connectMongo() {
  try {
    const db = client.db("deall-users-DB");
    dbConnection = db;
    return db;
  } catch (err) {
    console.log(err.stack);
    await client.close();
  }
}

function getDB() {
  return dbConnection;
}

module.exports = { connectMongo, getDB };
