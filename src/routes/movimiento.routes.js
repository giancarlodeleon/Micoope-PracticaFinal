import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getMovimientos,
  createMovimiento,
  getMovimiento,
  updateMovimiento,
  deleteMovimiento,
} from "../controllers/movimiento.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { MovimientoSchema } from "../schemas/movimiento.schema.js";

const router = Router();

router.get("/movimientos", authRequired, getMovimientos);
router.get("/movimientos/:id", authRequired, getMovimiento);
router.post("/movimientos", authRequired,validateSchema(MovimientoSchema), createMovimiento);
router.delete("/movimientos/:id", authRequired, deleteMovimiento);
router.put("/movimientos/:id", authRequired,validateSchema(MovimientoSchema), updateMovimiento);

export default router;
