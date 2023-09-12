const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError");


exports.setTourUserIds = (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review)

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

// exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);


exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if the review belongs to the currently logged-in user
  if (review.user._id.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to update this review', 403));
  }

  // Update the review with the new rating
  review.updateAndRecalculateAverage(req.body.rating);

  res.status(200).json({
    status: 'success',
    data: {
      data: review,
    },
  });
});
