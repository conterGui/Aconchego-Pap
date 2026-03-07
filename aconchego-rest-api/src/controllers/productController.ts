// controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product';

// ----------------------
// GET produtos públicos
// ----------------------
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find(); // remove o filtro available: true
    res.json(products);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error fetching products', error: msg });
  }
};

// ----------------------
// GET produto por ID
// ----------------------
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  console.log("⚠️ getProductById chamado com id:", req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Erro em getProductById:", msg);
    res.status(500).json({ message: 'Error fetching product', error: msg });
  }
};

// ----------------------
// GET todos produtos para admin
// ----------------------
export const getAllProductsAdmin = async (req: Request, res: Response): Promise<void> => {
  console.log("🔵 getAllProductsAdmin chamado");
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ ERRO:", error);
    res.status(500).json({ message: 'erro', error: String(error) });
  }
};

// ----------------------
// POST criar produto
// ----------------------
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      roast: req.body.roast,
      weight: req.body.weight,
      origin: req.body.origin,
      type: req.body.type,
      available: req.body.available ?? true, // padrão true
    });

    await product.save();
    res.status(201).json(product);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Erro em createProduct:", msg);
    res.status(400).json({ message: 'Error creating product', error: msg });
  }
};

// ----------------------
// PUT atualizar produto
// ----------------------
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        roast: req.body.roast,
        weight: req.body.weight,
        origin: req.body.origin,
        type: req.body.type,
        available: Boolean(req.body.available), // garante boolean
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Erro em updateProduct:", msg);
    res.status(400).json({ message: 'Error updating product', error: msg });
  }
};

// ----------------------
// DELETE produto
// ----------------------
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Erro em deleteProduct:", msg);
    res.status(500).json({ message: 'Error deleting product', error: msg });
  }
};