import Gasto from "../models/gasto.model.js";

export const getGastos = async (req, res) => {
  try {
    const gasto = await Gasto.find();
    res.json(gasto);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createGasto = async (req, res) => {
  try {
    const { nombre, precio, date } = req.body;
    const newGasto = new Gasto({
      nombre,
      precio,
      date,
      user: req.user.id,
    });
    const savedGasto = await newGasto.save();
    res.json(savedGasto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGasto = async (req, res) => {
  try {
    const gastos = await Gasto.findById(req.params.id);
    if (!gastos)
      return res.status(404).json({ message: "Gastos not found" });
    res.json(gastos);
  } catch (error) {
    return res.status(404).json({ message: "Gastos not found" });
  }
};

export const deleteGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ message: "Gasto not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Gasto not found" });
  }
};

export const updateGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gasto) return res.status(404).json(["Codigo ya existe"]);
    res.json(gasto);
  } catch (error) {
    return res.status(500).json(["Codigo ya existe"]);
  }
};
