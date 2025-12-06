import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from '../services/products.services.js';
import { validateProductPayload } from '../models/products.models.js';

export async function getAllProducts(req, res) {
  try {
    const items = await getAllProductsService();
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const item = await getProductByIdService(id);
    if (!item) return res.status(404).json({ error: 'Product not found' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
}

export async function createProduct(req, res) {
  try {
    const payload = req.body;
    validateProductPayload(payload);
    const created = await createProductService(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Failed to create product' });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    // Para PUT hay que esperar payload completo → validar
    validateProductPayload(payload);
    const updated = await updateProductService(id, payload);
    return res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Failed to update product' });
  }
}

export async function patchProduct(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    // PATCH: validación ligera que permite pocos campos - aquí solo comprobamos tipos si existen
    if (payload.price != null && isNaN(Number(payload.price))) {
      return res.status(400).json({ error: 'price must be a number' });
    }
    const updated = await updateProductService(id, payload);
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to patch product' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
}
