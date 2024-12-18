import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getVenta,
  getVentas,
  updateVentas,
  createVentas,
  deleteVentas
} from "../controllers/venta.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { VentaSchema } from "../schemas/venta.schema.js";

const router = Router();

router.get("/ventas", authRequired, getVentas);
router.get("/ventas/:id", authRequired, getVenta);
router.post("/ventas", authRequired,validateSchema(VentaSchema), createVentas);
router.delete("/ventas/:id", authRequired, deleteVentas);
router.put("/ventas/:id", authRequired,validateSchema(VentaSchema), updateVentas);

export default router;
