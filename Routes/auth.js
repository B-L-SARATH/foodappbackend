const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretkey = "mynameissarath";
router.post("/verifyuser", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, secretkey, (err, payload) => {
      if (err) {
        return res.status(401).send("not valid user");
      }
      return res.status(200).send("valid user");
    });
  } else {
    return res.status(401).send("no token found");
  }
});

module.exports = router;
