import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getPedidosCompra,
  createPedidosCompra,
  getPedidoCompra,
  updatePedidosCompra,
  deletePedidosCompra,
} from "../controllers/pedido_compra.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { PedidoCompraSchema } from "../schemas/pedido_compra.schema.js";

const router = Router();

router.get("/pedidos_compra", authRequired, getPedidosCompra);
router.get("/pedidos_compra/:id", authRequired, getPedidoCompra);
router.post("/pedidos_compra", authRequired,validateSchema(PedidoCompraSchema), createPedidosCompra);
router.delete("/pedidos_compra/:id", authRequired, deletePedidosCompra);
router.put("/pedidos_compra/:id", authRequired,validateSchema(PedidoCompraSchema), updatePedidosCompra);

export default router;
