import Boleta from "../models/boleta.model.js";

export const getBoletas = async (req, res) => {
  try {
    const boleta = await Boleta.find();
    res.json(boleta);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createBoleta = async (req, res) => {
  const { code } = req.body;

  try {
    const { tipo_boleta, serie, de, hasta, existencia, date } = req.body;
    const newBoleta = new Boleta({
      tipo_boleta,
      serie,
      de,
      hasta,
      existencia,
      date,
      user: req.user.id,
    });
    const savedBoleta = await newBoleta.save();
    res.json(savedBoleta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBoleta = async (req, res) => {
  try {
    const boletas = await Boleta.findById(req.params.id);
    if (!boletas) return res.status(404).json({ message: "Boletas not found" });
    res.json(boletas);
  } catch (error) {
    return res.status(404).json({ message: "Boletas not found" });
  }
};

export const deleteBoleta = async (req, res) => {
  try {
    const boleta = await Boleta.findByIdAndDelete(req.params.id);
    if (!boleta) return res.status(404).json({ message: "Boleta not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Boleta not found" });
  }
};

export const updateBoleta = async (req, res) => {
  try {
    const boleta = await Boleta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!boleta) return res.status(404).json(["Codigo ya existe"]);
    res.json(boleta);
  } catch (error) {
    return res.status(500).json(["Codigo ya existe"]);
  }
};
