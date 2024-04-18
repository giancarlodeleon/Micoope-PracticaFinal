import { Router } from "express";
import {
  createDato,
  deleteDato,
  getDatos,
  getDato
} from "../controllers/dato.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { DatoSchema } from "../schemas/dato.schema.js";

const router = Router();

router.get("/dato/:id", getDato);
router.get("/dato", getDatos);
router.post("/dato",validateSchema(DatoSchema), createDato);
router.delete("/dato", deleteDato);

export default router;