import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "No Token Provided" });
    }
    jwt.verify(token, authConfig.secret, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }
        const id = payload.id;
        req.userId = id;
        next();
    });
};
export { validateToken };
