import dotenv from 'dotenv';
import { signToken } from '../utils/jwt.utils.js';
dotenv.config();

const {
  DEV_USER_EMAIL,
  DEV_USER_PASSWORD,
  DEV_USER_ROLE,

  DEV_ADMIN_EMAIL,
  DEV_ADMIN_PASSWORD,
  DEV_ADMIN_ROLE,
} = process.env;

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos' });
    }

    // ✅ LOGIN USER
    if (email === DEV_USER_EMAIL && password === DEV_USER_PASSWORD) {
      const token = signToken({
        sub: email,
        role: DEV_USER_ROLE
      });

      return res.json({
        token: `Bearer ${token}`,
        role: DEV_USER_ROLE
      });
    }

    // ✅ LOGIN ADMIN
    if (email === DEV_ADMIN_EMAIL && password === DEV_ADMIN_PASSWORD) {
      const token = signToken({
        sub: email,
        role: DEV_ADMIN_ROLE
      });

      return res.json({
        token: `Bearer ${token}`,
        role: DEV_ADMIN_ROLE
      });
    }

    // ❌ Credenciales inválidas
    return res.status(401).json({ error: 'Credenciales invalidas' });
    
    // En producción aquí deberías verificar con Firebase, Auth u otro proveedor.
    // return res.status(501).json({ error: 'La autenticacion aún no se ha implementado para produccion' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login Fallido!' });
  }
}
