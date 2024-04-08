const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const secretkey = "mynameissarath";

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ success: false, message: "no token found" });
  }
  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      return res.status(401).send({ success: false, message: "invalid user" });
    } else {
      next();
    }
  });
};

router.get("/isloggedin", auth, async (req, res) => {
  res.send({ success: true, message: "user is logged in" });
});

router.post("/orderdata", async (req, res) => {
  const ordersdata = req.body.orders;
  ordersdata.splice(0, 0, { ordertime: req.body.ordertime });
  try {
    if (await Order.findOne({ email: req.body.email })) {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orders: req.body.orders } }
      );
      res.send("checkout success");
    } else {
      await Order.create({
        email: req.body.email,
        orders: [ordersdata],
      });
      res.send("checkout success");
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

router.post("/myorder", auth, async (req, res) => {
  try {
    const data = await Order.findOne({ email: req.body.email });
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ errors: err.message });
  }
});
module.exports = router;
