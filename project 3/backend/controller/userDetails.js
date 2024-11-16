const userModel = require("../models/userModel");
const Rental = require('../models/Rental');

async function userDetailsController(req, res) {
  try {
    console.log("userId", req.userId);
    const user = await userModel.findById(req.userId);
    const rentals = await Rental.find({ user: req.userId });

    if (!user) {
      return res.status(404).json({
        data: null,
        error: true,
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      data: { ...user.toObject(), rentals },
      error: false,
      success: true,
      message: "User details"
    });

    console.log("user", user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = userDetailsController;
