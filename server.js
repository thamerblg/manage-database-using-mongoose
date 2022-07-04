const express = require("express");
const connectDB = require("./config/connectDB");
const Person = require("./models/Person");

connectDB();

const app = express();
app.use(express.json());

/*
const addPerson = async () => {
  try {
    const newPerson = new Person({
      name: "kane",
      age: 26,
      favoriteFoods: ["Steak", "Mozzarella cheese"],
    });
    newPerson.save((err, person) => {
      if (err) return console.error(err);
      console.log(person.name + " saved to usersCollection collection.");
    });
  } catch (error) {
    console.log(error);
  }
};
addPerson();
*/

app.use("/persons", require("./routes/personRoutes"));

require("dotenv").config({ path: "./config/.env" });

const PORT = process.env.PORT;

// create server
app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`App listening on port ${PORT}!`)
);
