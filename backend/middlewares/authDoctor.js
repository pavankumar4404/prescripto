import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    
    try {
        const dtoken = req.headers.token;
    
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authDoctor;