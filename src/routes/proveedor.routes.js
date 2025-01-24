import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProveedors,
  createProveedors,
  getProveedor,
  updateProveedors,
  deleteProveedors,
} from "../controllers/proveedor.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { ProveedorSchema } from "../schemas/proveedor.schema.js";

const router = Router();

router.get("/proveedors", authRequired, getProveedors);
router.get("/proveedors/:id", authRequired, getProveedor);
router.post("/proveedors", authRequired,validateSchema(ProveedorSchema), createProveedors);
router.delete("/proveedors/:id", authRequired, deleteProveedors);
router.put("/proveedors/:id", authRequired,validateSchema(ProveedorSchema), updateProveedors);

export default router;
