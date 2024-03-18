import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getAgencia,
  createAgencia,
  updateAgencia,
  deleteAgencia,
  getAgencias,
} from "../controllers/agencia.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { AgenciaSchema } from "../schemas/agencia.schema.js";

const router = Router();

router.get("/agencias", authRequired, getAgencias);
router.get("/agencias/:id", authRequired, getAgencia);
router.post("/agencias", authRequired,validateSchema(AgenciaSchema), createAgencia);
router.delete("/agencias/:id", authRequired, deleteAgencia);
router.put("/agencias/:id", authRequired,validateSchema(AgenciaSchema), updateAgencia);

export default router;