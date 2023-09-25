<h4 align="center">An awesome tour booking site built on top of <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>.</h4>
## Key Features 📝

-   Authentication and Authorization
    -   Sign up, Log in, Logout, Update, and reset password.
-   User profile
    -   Update username, photo, email, password, and other information
    -   A user can be either a regular user or an admin or a lead guide or a guide.
    -   When a user signs up, that user by default regular user.
-   Tour
    -   Manage booking, check tour map, check users' reviews and rating
    -   Tours can be created by an admin user or a lead-guide.
    -   Tours can be seen by every user.
    -   Tours can be updated by an admin user or a lead guide.
    -   Tours can be deleted by an admin user or a lead-guide.
-   Reviews
    -   Only regular users can write reviews for tours that they have booked.
    -   All users can see the reviews of each tour.
    -   Regular users can edit and delete their own reviews.
    -   Regular users can not review the same tour twice.
    -   An admin can delete any review.
-   Credit card Payment

## Demonstration 🖥️

#### Home Page :

![image](https://github.com/Kh4N1/tourist-center/blob/main/MainPage_exp.png)

#### Tour Details :

![image](https://github.com/Kh4N1/tourist-center/blob/main/TourPage_exp.png)

#### User Profile :

![image](https://github.com/Kh4N1/tourist-center/blob/main/UserPage_exp.png)

#### Admin Profile :

![image](https://github.com/Kh4N1/tourist-center/blob/main/AdminPage_exp.png)

## Build With 🏗️

-   [NodeJS](https://nodejs.org/en/) - JS runtime environment
-   [Express](http://expressjs.com/) - The web framework used
-   [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
-   [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
-   [JSON Web Token](https://jwt.io/) - Security token
-   [ParcelJS](https://parceljs.org/) - Blazing fast, zero configuration web application bundler
-   [Postman](https://www.getpostman.com/) - API testing
-   [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/) - Email delivery platform
-   [JawgMap](https://www.jawg.io/en/) - Displaying the different locations of each tour.
-   [Leaflet](https://leafletjs.com/) - show the better look of tours location.

## To-do 🗒️

-   Review and rating
    -   Allow users to add a review directly at the website after they have taken a tour
-   Booking
    -   Prevent duplicate bookings after a user has booked that exact tour, implement favorite tours
-   Advanced authentication features
    -   Signup, confirm user email, log in with refresh token, two-factor authentication
-   And More! There's always room for improvement!

## Setting Up Your Local Environment ⚙️

```
* Clone this repo to your local machine.
* Using the terminal, navigate to the cloned repo.
* Install all the necessary dependencies, as stipulated in the package.json file.
* If you don't already have one, set up accounts with: MONGODB, MAPBOX, STRIPE, SENDGRID, and MAILTRAP. Please ensure to have at least basic knowledge of how these services work.
* In your .env file, set environment variables for the following:
    * DATABASE=your Mongodb database URL
    * DATABASE_PASSWORD=your MongoDB password

    * SECRET=your JSON web token secret
    * JWT_EXPIRES_IN=90d
    * JWT_COOKIE_EXPIRES_IN=90

    * EMAIL_USERNAME=your mailtrap username
    * EMAIL_PASSWORD=your mailtrap password
    * EMAIL_HOST=smtp.mailtrap.io
    * EMAIL_PORT=2525
    * EMAIL_FROM=your real-life email address

    * SENDGRID_USERNAME=apikey
    * SENDGRID_PASSWORD=your sendgrid password

    * STRIPE_SECRET_KEY=your stripe secret key
    * STRIPE_WEBHOOK_SECRET=your stripe webhook secret
* Your app should be running just fine on 127.0.0.1:3000

```

## Installation 🛠️

If you are living in IRAN, You have to use another internet service provider except MOKHABERAT, because my web app could not connect to mongoDB. (For example, use HAMRAH AVAL or IRANCELL)

```
npm run start
npm run watch:js
```

## Acknowledgement 🙏🏻

-   This project is part of the online course I've taken at Udemy. Thanks to Jonas Schmedtmann for creating this awesome course! Link to the course: [Node.js, Express, MongoDB & More: The Complete Bootcamp 2023](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
