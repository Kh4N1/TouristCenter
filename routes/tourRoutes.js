const express = require("express");

const tourController = require("./../controllers/tourController.js");

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

const router = express.Router();

// router.param("id", tourController.checkID);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour)
  .put(() => {
    //تابع مورد نظر
  });

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;