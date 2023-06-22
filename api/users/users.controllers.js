const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const hashedPassword = async (password) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "5h" });
  console.log(token);
  return token;
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = await hashedPassword(password);
    const newUser = await User.create(req.body);
    const token = await generateToken(req.body);
    console.log(token);
    console.log(req.body);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
