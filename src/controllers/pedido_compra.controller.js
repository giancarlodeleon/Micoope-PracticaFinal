import PedidoCompra from "../models/pedido_compra.model.js";

export const getPedidosCompra = async (req, res) => {
  try {
    const pedidos_compra = await PedidoCompra.find();
    res.json(pedidos_compra);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createPedidosCompra = async (req, res) => {
  try {
    const { solicitud,producto,cantidad, presentacion,date} = req.body;
  const newPedidoCompra = new PedidoCompra({
    solicitud,
    producto,
    cantidad,
    presentacion,
    date,
    user: req.user.id,
  });
  const savedPedidoCompra = await newPedidoCompra.save();
  res.json(savedPedidoCompra);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getPedidoCompra = async (req, res) => {
  try {
    const pedidos_compra = await PedidoCompra.findById(req.params.id);
    if (!pedidos_compra) return res.status(404).json({ message: "Pedido Compra not found" });
    res.json(pedidos_compra);
  } catch (error) {
    return res.status(404).json({ message: "Pedido Compra not found" });
  }
};

export const deletePedidosCompra = async (req, res) => {
  try {
    const pedidos_compra = await PedidoCompra.findByIdAndDelete(req.params.id);
    if (!pedidos_compra) return res.status(404).json({ message: "Pedido Compra not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Pedido Compra not found" });
  }
};

export const updatePedidosCompra = async (req, res) => {
  try {
    const pedidos_compra = await PedidoCompra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pedidos_compra) return res.status(404).json({ message: "Pedido Compra not found" });
    res.json(pedidos_compra);
  } catch (error) {
    return res.status(404).json({ message: "Pedido Compra not found" });
  }
};
