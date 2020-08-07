const router = require("express").Router();
const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  singUpValidation,
  singInValidation,
} = require("../../validation/validation");
const config = require("../../config");
const tokenHelp= require('../../helpers/tokenHelper')


router.post("/signup", async (req, res) => {
  const { error } = singUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({
    email: req.body.email,
  });

  if (emailExist) return res.status(400).send("Email alredy exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sing IN
router.post("/signin", async (req, res) => {
  // Validation
  const { error } = singInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Chechin email exit
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send("Email is wrong");

  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong");

  jwt.sign(
    { _id: user._id },
    tokenHelp.encodeBase64(config.TOKEN_SECRET),
    { algorithm: "HS256", expiresIn: "2 days" },
    (err, token) => {
      if (err) res.status(503).send("503 Service Unavailable");
      else res.json({ token: token, username: user.name }).status(200);
    }
  );
});

module.exports = router;
