import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUsers,
  deleteUsers,
  getUser,
  updateUsers

} from "../controllers/users.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";


const router = Router();

router.get("/users", authRequired, getUsers);
router.delete("/users/:id", authRequired, deleteUsers);
router.get("/users/:id", authRequired, getUser);
router.put("/users/:id", authRequired,validateSchema(registerSchema), updateUsers);



export default router;
 