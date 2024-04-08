const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const app = express();
const bodyparser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const secretkey = "mynameissarath";
router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must have 5 chars").isLength({ min: 5 }),
    body("name").trim().isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //usercheck
      const userexisted = await User.findOne({ email: req.body.email });
      if (userexisted) {
        return res.status(409).send("user already existed");
      }
      const hashpass = await bcrypt.hash(req.body.password, 10);
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashpass,
      });
      res.send("user created");
    } catch (err) {
      res.json({ error: err.message });
    }
  }
);

//login
router.post(
  "/login",
  [body("email", "Enter valid email").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdata = await User.findOne({ email: req.body.email });
      if (!userdata) {
        return res.status(400).json({ errors: "user not found" });
      }
      const comparepass = await bcrypt.compare(
        req.body.password,
        userdata.password
      );
      if (!comparepass) {
        return res.status(400).json({ errors: "password incorrect" });
      }
      const payload = { user: { id: userdata.id } };
      const authtoken = jwt.sign(payload, secretkey);

      res.send({ authtoken: authtoken, msg: "login success" });
    } catch (err) {
      res.json({ errors: err.message });
    }
  }
);
module.exports = router;
