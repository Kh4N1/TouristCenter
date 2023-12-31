const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const reviewRouter = require("./routes/reviewRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) Global middlewares
// serving static files
app.use(express.static(path.join(__dirname, "public")));
// set security HTTP headers
app.use(helmet());
app.use(helmet.xXssProtection());

const csp =
  "script-src 'self' https://unpkg.com https://cdnjs.cloudflare.com 'unsafe-inline'";
app.use((req, res, next) => {
  res.header("Content-Security-Policy", csp);
  next();
});

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit requests from same API
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

// data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// data Sanitization against XSS
app.use(xssClean());

// prevent parameters pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  }),
);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies)
  // console.log((req.headers))
  next();
});

// 2) routes

app.use("/", viewRoutes);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
