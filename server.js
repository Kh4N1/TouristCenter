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
  timeout(7),
])
  .then(() => {
    console.log("✅ DB connection successful! ");
  })
  .catch((error) => {
    console.error(`💥${error.message}`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
