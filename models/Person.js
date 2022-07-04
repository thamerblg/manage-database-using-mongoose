const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", userSchema, "usersCollection");

module.exports = Person;
