import { Router } from "express";
import {
  createDato,
  deleteDato,
  getDatos,
} from "../controllers/dato.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { DatoSchema } from "../schemas/dato.schema.js";

const router = Router();

router.get("/dato", getDatos);
router.post("/dato",validateSchema(DatoSchema), createDato);
router.delete("/dato/:id", deleteDato);

export default router;