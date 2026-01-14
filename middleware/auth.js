const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return res.status(401).json({ message: "Unauthorized" });
        const token = authHeader.split(" ")[1];
        const encoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = encoded;
        next();


    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
module.exports = authMiddleWare;