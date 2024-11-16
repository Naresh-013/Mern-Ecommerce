const Rental = require('../models/Rental');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rentals',
        format: async (req, file) => path.extname(file.originalname).slice(1),
        public_id: (req, file) => Date.now() + path.extname(file.originalname)
    },
});

const upload = multer({ storage: storage });

async function createRentalController(req, res) {
    try {
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        const { name, description, price, category, fromDate, toDate, location } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !description || !price || !category || !fromDate || !toDate || !location) {
            throw new Error("Please provide all required fields");
        }

        const userId = req.userId;
        console.log("User ID:", userId);

        if (!userId) {
            throw new Error("User ID is not available");
        }

        const rental = new Rental({ 
            name, 
            description, 
            price, 
            category, 
            fromDate, 
            toDate, 
            image, 
            location,
            user: userId
        });

        const savedRental = await rental.save();

        res.status(201).json({
            data: savedRental,
            success: true,
            error: false,
            message: "Rental successfully created!"
        });
    } catch (err) {
        console.error("Error creating rental:", err);
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

async function getRentalsController(req, res) {
    try {
        const rentals = await Rental.find().populate('user', 'name email');
        res.status(200).json({
            data: rentals,
            success: true,
            error: false,
            message: "Rentals fetched successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

async function getRentalsByCategoryController(req, res) {
    try {
        const category = req.params.category;
        const rentals = await Rental.find({ category }).populate('user', 'name email');
        res.status(200).json({
            data: rentals,
            success: true,
            error: false,
            message: "Rentals fetched successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = {
    createRentalController,
    getRentalsController,
    getRentalsByCategoryController,
    upload,
};
