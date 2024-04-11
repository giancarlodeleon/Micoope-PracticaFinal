import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto,
  getGastos,
} from "../controllers/gasto.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { GastoSchema } from "../schemas/gasto.schema.js";

const router = Router();

router.get("/gasto",authRequired, getGastos);
router.get("/gasto/:id",authRequired, getGasto);
router.post("/gasto",authRequired,validateSchema(GastoSchema), createGasto);
router.delete("/gasto/:id",authRequired, deleteGasto);
router.put("/gasto/:id",authRequired,validateSchema(GastoSchema), updateGasto);

export default router;