const express = require("express");
const Person = require("../models/Person");

const router = express.Router();

// Find all documents
router.get("/allPersons", async (req, res) => {
  const allPersons = await Person.find({});
  res.send(allPersons);
});

// Create Many Records with model.create()
router.post("/addPersons", async (req, res) => {
  try {
    const arrayOfPeople = [
      { name: "Jelly", age: 22, favoriteFoods: ["Steak", "Chicken", "Bacon"] },
      {
        name: "Johny",
        age: 27,
        favoriteFoods: ["Steak", "Chicken", "Mozzarella cheese"],
      },
      {
        name: "Jeniffer",
        age: 20,
        favoriteFoods: ["Waffles", "Beef", "Mozzarella cheese"],
      },
      {
        name: "george",
        age: 31,
        favoriteFoods: ["Steak", "Chicken", "Mozzarella cheese"],
      },
    ];
    await Person.create(arrayOfPeople);
    const allPersons = await Person.find({});
    res.send({ msg: "person added success", allPersons });
  } catch (error) {
    console.log(error);
  }
});

// Use model.find() to Search Your Database
router.get("/searchByName", async (req, res) => {
  const result = await Person.find({ name: req.body.name });
  if (result) {
    return res.send({ msg: "person found", result });
  } else {
    return res.status(404).send({ msg: "person not found" });
  }
});

// Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/findOne", async (req, res) => {
  const result = await Person.findOne({
    favoriteFoods: req.body.favoriteFoods,
  });
  if (result) {
    return res.send({ msg: "person found", result });
  } else {
    return res.status(404).send({ msg: "person not found" });
  }
});

// Use model.findById() to Search Your Database By _id
router.get("/findById", async (req, res) => {
  const result = await Person.findById({
    _id: req.query._id,
  });
  if (result) {
    return res.send({ msg: "person found", result });
  } else {
    return res.status(404).send({ msg: "person not found" });
  }
});

// Perform Classic Updates by Running Find, Edit, then Save
router.put("/update", async (req, res) => {
  await Person.update(
    { _id: req.query._id },
    { $push: { favoriteFoods: "hamburger" } },
    (err, done) => {
      if (err) {
        return res.send("Something wrong when updating data!");
      }
      return res.send("data updated!");
    }
  );
});

// Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/findOneAndUpdate", async (req, res) => {
  const personName = await Person.find({ name: req.body.name });
  await Person.findOneAndUpdate(
    { name: personName[0].name },
    { $set: { age: 20 } },
    { new: true },
    (err, doc) => {
      if (err) {
        return res.send("Something wrong when updating data!");
      }
      return res.send(doc);
    }
  );
});

// Delete One Document Using model.findByIdAndRemove
router.delete("/findByIdAndRemove", async (req, res) => {
  const searchById = await Person.findById({
    _id: req.query._id,
  });
  await Person.findByIdAndRemove(searchById._id, (err, result) => {
    if (err) return res.send(err);
    else return res.send("data removed!");
  });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/deleteMany", async (req, res) => {
  await Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return res.send(err);
    else return res.send("all data with this name was deleted successfully!");
  });
});

// Chain Search Query Helpers to Narrow Search Results
router.get("/chainSearch", async (req, res) => {
  await Person.find({ favoriteFoods: { $in: "burritos" } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return res.send(err);
      else return res.send(data);
    });
});
module.exports = router;
