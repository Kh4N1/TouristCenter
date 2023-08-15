const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");

// 1) middlewares
// eslint-disable-next-line no-undef
console.log(process.env.NODE_ENV);
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
// eslint-disable-next-line no-undef
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("hello from middleware 💥");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
