import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getBoletas,
  createBoleta,
  getBoleta,
  updateBoleta,
  deleteBoleta,
} from "../controllers/boleta.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { BoletaSchema } from "../schemas/boleta.schema.js";

const router = Router();

router.get("/boletas", authRequired, getBoletas);
router.get("/boletas/:id", authRequired, getBoleta);
router.post("/boletas", authRequired,validateSchema(BoletaSchema), createBoleta);
router.delete("/boletas/:id", authRequired, deleteBoleta);
router.put("/boletas/:id", authRequired,validateSchema(BoletaSchema), updateBoleta);

export default router;