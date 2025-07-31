const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, wallet } = req.body;

  console.log("Signup request:", req.body); // 👈 Log incoming data

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      wallet,
      skills: [],
    });

    await newUser.save();

    res.status(201).json({ msg: "User created!" });
  } catch (err) {
    console.error("Signup error:", err); // 👈 Catch any errors
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { name: user.name, email: user.email, wallet: user.wallet } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
