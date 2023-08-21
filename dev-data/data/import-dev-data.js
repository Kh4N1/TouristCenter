const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Tour = require("./../../models/tourModel");

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
