const express = require("express");
const router = express.Router();

const User = require("../modals/mflix/users");

router.get("/", async (req, res) => {
  console.log("receiving get request for users");
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
router.patch("/:id", getUser, (req, res) => {});
router.delete("/:id", getUser, (req, res) => {});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find the user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
