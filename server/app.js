// if (process.env.NODE_ENV !== "production") {
// }
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 4001;
const { connectMongo } = require("./config/mongoConnection.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

connectMongo()
  .then((db) => {
    // console.log(db);
    app.listen(port, () => {
      console.log("app connected to " + port);
    });
  })
  .catch((err) => console.log(err));
