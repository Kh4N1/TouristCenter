const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();

// 1) MIDDLEWARES

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// 2) ROUTS HANDLERS

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    result: tours.length,
    requestAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
      console.log(`${err}❌`);
    },
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined!",
  });
};

// 3) ROUTS

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route("/")
  .get(getAllTours)
  .post(createTour)
  .put(() => {
    //تابع مورد نظر
  });

tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .put(() => {});

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
