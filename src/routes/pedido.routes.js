import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getPedidos,
  createPedidos,
  getPedido,
  updatePedidos,
  deletePedidos,
} from "../controllers/pedido.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { PedidoSchema } from "../schemas/pedido.schema.js";

const router = Router();

router.get("/pedidos", authRequired, getPedidos);
router.get("/pedidos/:id", authRequired, getPedido);
router.post("/pedidos", authRequired,validateSchema(PedidoSchema), createPedidos);
router.delete("/pedidos/:id", authRequired, deletePedidos);
router.put("/pedidos/:id", authRequired,validateSchema(PedidoSchema), updatePedidos);

export default router;
