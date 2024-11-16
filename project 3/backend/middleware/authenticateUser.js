const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        console.log("Token:", token);

        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            // Attach the user ID to the request object
            req.userId = decoded._id; // Ensure decoded token contains the user ID
            console.log("Decoded user ID:", req.userId);
            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
