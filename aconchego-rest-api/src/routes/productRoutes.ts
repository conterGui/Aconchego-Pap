import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin
} from '../controllers/productController';

const router = Router();

// Rotas admin primeiro
router.get('/admin', getAllProductsAdmin); // ✅ sem "products" no final

// Rotas padrão de CRUD
router.get('/:id', getProductById);
router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;