import { Router } from "express";
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

router.get("/gasto", getGastos);
router.get("/gasto/:id", getGasto);
router.post("/gasto",validateSchema(GastoSchema), createGasto);
router.delete("/gasto/:id", deleteGasto);
router.put("/gasto/:id",validateSchema(GastoSchema), updateGasto);

export default router;