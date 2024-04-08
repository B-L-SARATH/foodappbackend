const express = require("express");
const mongodb = require("./db");
// const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();
app.use(cors());
// app.use(cookieparser())
app.use(express.json({ extended: false }));
app.use("/api", require("./Routes/createuser"));
app.use("/api", require("./Routes/Displayfood"));
app.use("/api", require("./Routes/Orderdata"));
app.use("/api", require("./Routes/auth"));
mongodb();
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(5000, () => {
  console.log("server is running on 5000");
});
