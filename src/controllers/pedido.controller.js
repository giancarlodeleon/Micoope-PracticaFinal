import Pedido from "../models/pedido.model.js";

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createPedidos = async (req, res) => {
  try {
    const { nombre,producto,cantidad, total,date} = req.body;
  const newPedido = new Historial({
    nombre,
    producto,
    cantidad,
    total,
    date,
    user: req.user.id,
  });
  const savedPedido = await newPedido.save();
  res.json(savedPedido);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: "Pedido not found" });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: "Pedido not found" });
  }
};

export const deletePedidos = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ message: "Pedido not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Pedido not found" });
  }
};

export const updatePedidos = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pedido) return res.status(404).json({ message: "Pedido not found" });
    res.json(pedido);
  } catch (error) {
    return res.status(404).json({ message: "Pedido not found" });
  }
};
