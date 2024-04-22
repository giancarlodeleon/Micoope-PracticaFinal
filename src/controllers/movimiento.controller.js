import Movimiento from "../models/movimiento.model.js";

export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find();
    res.json(movimientos);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createMovimiento = async (req, res) => {
  try {
    const { date, tipo, serie, de, hasta, total, saldo,agencia , usado} = req.body;
  const newMovimiento = new Movimiento({
    date,
    tipo,
    serie,
    de,
    hasta,
    total,
    saldo,
    agencia,
    usado

  });
  const savedMovimiento = await newMovimiento.save();
  res.json(savedMovimiento);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findById(req.params.id);
    if (!movimiento) return res.status(404).json({ message: "Movimiento not found" });
    res.json(movimiento);
  } catch (error) {
    return res.status(404).json({ message: "Movimiento not found" });
  }
};

export const deleteMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByIdAndDelete(req.params.id);
    if (!movimiento) return res.status(404).json({ message: "Movimiento not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Movimiento not found" });
  }
};

export const updateMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movimiento) return res.status(404).json({ message: "Movimiento not found" });
    res.json(movimiento);
  } catch (error) {
    return res.status(404).json({ message: "Movimiento not found" });
  }
};
