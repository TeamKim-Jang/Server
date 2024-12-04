//middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { User } from '../models/index.js';


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findOne({ where: { user_id: decoded.id } });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
};


export default authMiddleware;

