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
    const { caso,hora, cliente,producto,nombre_producto,precio_compra,precio_venta, date } = req.body;
    const newDato = new Dato({
      caso,
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

export const getDato = async (req, res) => {
  try {
    const dato = await Dato.findById(req.params.id);
    if (!dato) return res.status(404).json({ message: "Dato not found" });
    res.json(dato);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const deleteDato = async (req, res) => {
  try {
    await Dato.deleteMany({});
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

