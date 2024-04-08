const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://leelasarathbaswa:sarathsai1@cluster0.vgna4ic.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongodb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fooditemsdata = await mongoose.connection.db
      .collection("food_items")
      .find()
      .toArray();
    global.fooditems = fooditemsdata;

    const foodcatergorydata = await mongoose.connection.db
      .collection("food_category")
      .find()
      .toArray();
    global.fooditems = fooditemsdata;
    global.foodcategory = foodcatergorydata;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = mongodb;
