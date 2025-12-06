import dotenv from 'dotenv';
import { signToken } from '../utils/jwt.utils.js';
dotenv.config();

const DEV_EMAIL = process.env.DEV_USER_EMAIL;
const DEV_PASS = process.env.DEV_USER_PASSWORD;

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // En este paso inicial usamos credenciales dev (solo para desarrollo).
    if (process.env.NODE_ENV !== 'production') {
      if (email === DEV_EMAIL && password === DEV_PASS) {
        const token = signToken({ sub: email, role: 'dev' });
        return res.json({ token: `Bearer ${token}` });
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // En producción aquí deberías verificar con Firebase Auth u otro proveedor.
    return res.status(501).json({ error: 'Auth not implemented for production yet' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
}
