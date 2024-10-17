import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getHistorials,
  createHistorials,
  getHistorial,
  updateHistorials,
  deleteHistorials,
} from "../controllers/historial.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { HistorialSchema } from "../schemas/historial.schema.js";

const router = Router();

router.get("/historials", authRequired, getHistorials);
router.get("/historials/:id", authRequired, getHistorial);
router.post("/historials", authRequired,validateSchema(HistorialSchema), createHistorials);
router.delete("/historials/:id", authRequired, deleteHistorials);
router.put("/historials/:id", authRequired,validateSchema(HistorialSchema), updateHistorials);

export default router;
