import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authMiddleware = (req, res, next) => {
  try {
    console.log('Authorization Header:', req.headers['authorization']);
    const authHeader = req.headers['authorization'];

    // Authorization 헤더 확인
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

    // 토큰 검증
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        console.error('JWT Error:', err.message);
        return res.status(401).json({ error: 'Failed to authenticate token' });
      }
      console.log('Decoded Token:', decoded);
      // 유저 ID를 req 객체에 저장
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default authMiddleware;

