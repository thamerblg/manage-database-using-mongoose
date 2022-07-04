//Import the mongoose module
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" });

const MONGODB_URI = process.env.MONGODB_URI;

//Connect to the database
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected with success !!!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
