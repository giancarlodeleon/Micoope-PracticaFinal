import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getRols,
  createRols,
  getRol,
  updateRols,
  deleteRols,
} from "../controllers/rol.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { RolSchema } from "../schemas/rol.schema.js";

const router = Router();

router.get("/rols", authRequired, getRols);
router.get("/rols/:id", authRequired, getRol);
router.post("/rols", authRequired,validateSchema(RolSchema), createRols);
router.delete("/rols/:id", authRequired, deleteRols);
router.put("/rols/:id", authRequired,validateSchema(RolSchema), updateRols);

export default router;