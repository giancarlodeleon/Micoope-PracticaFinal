import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getGasto,
  getGastos,
  deleteGastos,
  updateGastos,
  createGastos
} from "../controllers/gasto.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { GastoSchema } from "../schemas/gasto.schema.js";

const router = Router();

router.get("/ventas", authRequired, getGastos);
router.get("/gastos/:id", authRequired, getGasto);
router.post("/ventas", authRequired,validateSchema(GastoSchema), createGastos);
router.delete("/gastos/:id", authRequired, deleteGastos);
router.put("/gastos/:id", authRequired,validateSchema(GastoSchema), updateGastos);

export default router;
