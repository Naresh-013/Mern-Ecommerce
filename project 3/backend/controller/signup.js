const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");

async function userSignUpController(req, res) {
    try {
        const { email, password, name, mobile } = req.body;
        const user = await userModel.findOne({ $or: [{ email }, { mobile }] });

        if (user) {
            throw new Error("User with provided email or mobile number already exists.");
        }

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }
        if (!mobile) {
            throw new Error("Please provide mobile number");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if (!hashPassword) {
            throw new Error("Something went wrong");
        }
        const payload = {
            ...req.body,
            password: hashPassword
        };
        const userData = new userModel(payload);
        const saveUser = await userData.save();
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User successfully created!"
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
