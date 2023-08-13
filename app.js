const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("hello from middleware 💥");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
