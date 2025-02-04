import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getSolicitudsCompra,
  createSolicitudsCompra,
  getSolicitudCompra,
  updateSolicitudsCompra,
  deleteSolicitudsCompra,
} from "../controllers/solicitud_compra.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { SolicitudCompraSchema } from "../schemas/solicitud_compra.schema.js";

const router = Router();

router.get("/solicitudes_compra", authRequired, getSolicitudsCompra);
router.get("/solicitudes_compra/:id", authRequired, getSolicitudCompra);
router.post("/solicitudes_compra", authRequired,validateSchema(SolicitudCompraSchema), createSolicitudsCompra);
router.delete("/solicitudes_compra/:id", authRequired, deleteSolicitudsCompra);
router.put("/solicitudes_compra/:id", authRequired,validateSchema(SolicitudCompraSchema), updateSolicitudsCompra);

export default router;
