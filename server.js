const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app.js");

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `❌ Request took too long for getting DBs! Timeout after ${sec} second ❌`,
        ),
      );
    }, sec * 1000);
  });
};

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

Promise.race([
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  timeout(5),
])
  .then(() => {
    console.log("DB connection successful! ✅");
  })
  .catch((error) => {
    console.error(`💥${error.message}`);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});


const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "fadaei",
  price: 899
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(`ERROR ‼: ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
