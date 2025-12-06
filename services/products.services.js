import { db } from '../config/firebase.config.js';
import admin from 'firebase-admin';

const productsCol = db.collection('products');

export async function createProductService(data) {
  const payload = { ...data, createdAt: new Date() };
  const ref = await productsCol.add(payload);
  return { id: ref.id, ...payload };
}

export async function getAllProductsService() {
  const snap = await productsCol.get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductByIdService(id) {
  const docRef = productsCol.doc(id);
  const snap = await docRef.get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

export async function updateProductService(id, data) {
  const docRef = productsCol.doc(id);
  await docRef.update({ ...data, updatedAt: new Date() });
  const snap = await docRef.get();
  return { id: snap.id, ...snap.data() };
}

export async function deleteProductService(id) {
  const docRef = productsCol.doc(id);
  await docRef.delete();
  return true;
}
