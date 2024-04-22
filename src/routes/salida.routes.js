import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getSalidas,
  createSalidas,
  getSalida,
  updateSalidas,
  deleteSalidas,
} from "../controllers/salida.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { SalidaSchema } from "../schemas/salida.schema.js";

const router = Router();

router.get("/salidas", authRequired, getSalidas);
router.get("/salidas/:id", authRequired, getSalida);
router.post("/salidas", authRequired,validateSchema(SalidaSchema), createSalidas);
router.delete("/salidas/:id", authRequired, deleteSalidas);
router.put("/salidas/:id", authRequired,validateSchema(SalidaSchema), updateSalidas);

export default router;
