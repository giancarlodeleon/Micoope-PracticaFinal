import Gasto from "../models/gasto.model.js";

export const getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find();
    res.json(gastos);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createGastos = async (req, res) => {
  try {
    const { nombre, precio, factura, tipo, date } = req.body;
    const newGasto = new Gasto({
      nombre,
      factura,
      tipo,
      precio,
      date,
      user: req.user.id,
    });
    const savedGasto = await newGasto.save();
    res.json(savedGasto);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id);
    if (!gasto) return res.status(404).json({ message: "Gasto not found" });
    res.json(gasto);
  } catch (error) {
    return res.status(404).json({ message: "Gasto not found" });
  }
};

export const deleteGastos = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ message: "Gasto not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Gasto not found" });
  }
};

export const updateGastos = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gasto) return res.status(404).json({ message: "Gasto not found" });
    res.json(gasto);
  } catch (error) {
    return res.status(404).json({ message: "Gasto not found" });
  }
};
