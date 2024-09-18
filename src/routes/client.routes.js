import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getClients,
  createClients,
  getClient,
  updateClients,
  deleteClients,
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { ClientSchema } from "../schemas/client.schema.js";

const router = Router();

router.get("/clients", authRequired, getClients);
router.get("/clients/:id", authRequired, getClient);
router.post("/clients", authRequired,validateSchema(ClientSchema), createClients);
router.delete("/clients/:id", authRequired, deleteClients);
router.put("/clients/:id", authRequired,validateSchema(ClientSchema), updateClients);

export default router;
