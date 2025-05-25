import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    
    try {
        const token = req.headers.token;
    
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;