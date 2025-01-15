import Historial from "../models/historial.model.js";

export const getHistorials = async (req, res) => {
  try {
    const historials = await Historial.find();
    res.json(historials);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createHistorials = async (req, res) => {
  try {
    const {num_doc,recibo,tipo_pago,banco,cliente,tipo,descripcion,cantidad,date} = req.body;
  const newHistorial = new Historial({
    num_doc,
    recibo,
    tipo_pago,
    banco,
    cliente,
    tipo,
    descripcion,
    cantidad,
    date,
    user: req.user.id,
  });
  const savedHistorial = await newHistorial.save();
  res.json(savedHistorial);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getHistorial = async (req, res) => {
  try {
    const historial = await Historial.findById(req.params.id);
    if (!historial) return res.status(404).json({ message: "Historial not found" });
    res.json(historial);
  } catch (error) {
    return res.status(404).json({ message: "Historial not found" });
  }
};

export const deleteHistorials = async (req, res) => {
  try {
    const historial = await Historial.findByIdAndDelete(req.params.id);
    if (!historial) return res.status(404).json({ message: "Historial not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Historial not found" });
  }
};

export const updateHistorials = async (req, res) => {
  try {
    const historial = await Historial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!historial) return res.status(404).json({ message: "Historial not found" });
    res.json(historial);
  } catch (error) {
    return res.status(404).json({ message: "Historial not found" });
  }
};
