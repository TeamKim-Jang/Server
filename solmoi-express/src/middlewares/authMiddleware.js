//middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { User } from '../models/index.js';


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    // Bearer <token> 형식인지 확인
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('Invalid token format');
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const token = parts[1];

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, config.JWT_SECRET);
    // } catch (err) {
    //   if (err.name === 'TokenExpiredError') {
    //     return res.status(401).json({ error: 'Token expired' });
    //   }
    //   return res.status(401).json({ error: 'Invalid token' });
    // }

    const user = await User.findOne({ where: { access_token: token } });
      if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
 
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default authMiddleware;

