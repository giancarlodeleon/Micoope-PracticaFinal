import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getSolicituds,
  createSolicituds,
  getSolicitud,
  updateSolicituds,
  deleteSolicituds,
} from "../controllers/solicitud.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { SolicitudSchema } from "../schemas/solicitud.schema.js";

const router = Router();

router.get("/solicitudes", authRequired, getSolicituds);
router.get("/solicitudes/:id", authRequired, getSolicitud);
router.post("/solicitudes", authRequired,validateSchema(SolicitudSchema), createSolicituds);
router.delete("/solicitudes/:id", authRequired, deleteSolicituds);
router.put("/solicitudes/:id", authRequired,validateSchema(SolicitudSchema), updateSolicituds);

export default router;
