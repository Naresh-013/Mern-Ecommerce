const express = require('express');
const { createRentalController, getRentalsController, getRentalsByCategoryController, upload } = require('../controller/rentalController');
const userSignUpController = require('../controller/signup');
const userSignInController = require('../controller/signin');
const userDetailsController = require('../controller/userDetails');
const authToken = require("../middleware/authenticateUser");
const userLogout = require('../controller/userLogout');

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post('/rentals', authToken, upload.single('image'), createRentalController);
router.get('/rentals', getRentalsController);
router.get('/rentals/category/:category', getRentalsByCategoryController);

module.exports = router;
