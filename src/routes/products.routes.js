import { Router } from "express";
import {
  getProducts,
  createProducts,
  getProduct,
  updateProducts,
  deleteProducts,
} from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { ProductSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products",validateSchema(ProductSchema), createProducts);
router.delete("/products/:id", deleteProducts);
router.put("/products/:id",validateSchema(ProductSchema), updateProducts);

export default router;
