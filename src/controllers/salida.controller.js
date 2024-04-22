import Salida from "../models/salida.model.js";

export const getSalidas = async (req, res) => {
  try {
    const salidas = await Salida.find();
    res.json(salidas);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createSalidas = async (req, res) => {
  try {
    const { agencia,tipo, serie, cantidad, de, hasta, comentario, fecha } = req.body;
  const newSalida = new Salida({
    agencia,
    tipo,
    serie,
    cantidad,
    de,
    hasta,
    comentario,
    fecha,
    
  });
  const savedSalida = await newSalida.save();
  res.json(savedSalida);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getSalida = async (req, res) => {
  try {
    const salida = await Salida.findById(req.params.id);
    if (!salida) return res.status(404).json({ message: "Salida not found" });
    res.json(salida);
  } catch (error) {
    return res.status(404).json({ message: "Salida not found" });
  }
};

export const deleteSalidas = async (req, res) => {
  try {
    const salida = await Salida.findByIdAndDelete(req.params.id);
    if (!salida) return res.status(404).json({ message: "Salida not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Salida not found" });
  }
};

export const updateSalidas = async (req, res) => {
  try {
    const salida = await Salida.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!salida) return res.status(404).json({ message: "Salida not found" });
    res.json(salida);
  } catch (error) {
    return res.status(404).json({ message: "Salida not found" });
  }
};
