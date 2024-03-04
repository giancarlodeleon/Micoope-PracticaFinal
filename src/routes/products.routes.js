import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
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

router.get("/products", authRequired, getProducts);
router.get("/products/:id", authRequired, getProduct);
router.post("/products", authRequired,validateSchema(ProductSchema), createProducts);
router.delete("/products/:id", authRequired, deleteProducts);
router.put("/products/:id", authRequired,validateSchema(ProductSchema), updateProducts);

export default router;
