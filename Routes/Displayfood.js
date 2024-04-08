const express = require("express");
const router = express.Router();

router.get("/fooditems", (req, res) => {
  res.send([global.fooditems, global.foodcategory]);
});

module.exports = router;
