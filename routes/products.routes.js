import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = express.Router();

/* ✅ RUTA DE DIAGNOSTICO */
router.get('/ping', (req, res) => {
  res.json({ ok: true, msg: 'products router works' });
});

router.get('/', authMiddleware, authorizeRoles('user', 'admin'), getAllProducts);
router.get('/:id', authMiddleware, authorizeRoles('user', 'admin'), getProductById);
router.post('/create', authMiddleware, authorizeRoles('admin'), createProduct);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateProduct);
router.patch('/:id', authMiddleware, authorizeRoles('admin'), patchProduct);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProduct);

export default router;
