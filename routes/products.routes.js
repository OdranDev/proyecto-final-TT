import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = express.Router();

/* ✅ RUTA DE PRUEBA */
router.get('/ping', (req, res) => {
  res.json({ ok: true, msg: 'products router works' });
});

/* ✅ CRUD PROTEGIDO */
router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/create', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.patch('/:id', authMiddleware, patchProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
