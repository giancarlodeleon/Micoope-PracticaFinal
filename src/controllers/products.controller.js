import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createProducts = async (req, res) => {
  try {
    const {
      code,
      name,
      proveedor,
      comision,
      stock,
      presentation,
      cost_price,
      selling_price_1,
      selling_price_2,
      selling_price_3,
      minimum_stock,
      date,
    } = req.body;
    const newProduct = new Product({
      code,
      name,
      proveedor,
      comision,
      presentation,
      cost_price,
      selling_price_1,
      selling_price_2,
      selling_price_3,
      minimum_stock,
      stock,
      date,
      user: req.user.id,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};
