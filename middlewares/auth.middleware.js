import { verifyToken } from '../utils/jwt.utils.js';

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'] || '';
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Token missing or malformed' });
    }
    const token = parts[1];
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
