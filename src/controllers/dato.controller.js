import Dato from "../models/dato.model.js";

export const getDatos = async (req, res) => {
  try {
    const dato = await Dato.find();
    res.json(dato);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createDato = async (req, res) => {
  try {
    const { hora, cliente,producto,nombre_producto,precio_compra,precio_venta, date } = req.body;
    const newDato = new Dato({
      hora,
      cliente,
      producto,
      nombre_producto,
      precio_compra,
      precio_venta,
      date,
    });
    const savedDato = await newDato.save();
    res.json(savedDato);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

