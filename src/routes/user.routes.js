import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUsers,
  deleteUsers

} from "../controllers/users.controller.js";


const router = Router();

router.get("/users", authRequired, getUsers);
router.delete("/users/:id", authRequired, deleteUsers);



export default router;
 