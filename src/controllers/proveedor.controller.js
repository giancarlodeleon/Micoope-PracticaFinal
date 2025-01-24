import Proveedor from "../models/proveedor.model.js";

export const getProveedors = async (req, res) => {
  try {
    const proveedors = await Proveedor.find();
    res.json(proveedors);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createProveedors = async (req, res) => {
  try {
    const {
      code,
      nit,
      nombre,
      empresa,
      email,
      direccion,
      telefono,
      date,
    } = req.body;
    const newProveedor = new Proveedor({
      code,
      nit,
      nombre,
      empresa,
      email,
      direccion,
      telefono,
      date,
      user: req.user.id,
    });
    const savedProveedor = await newProveedor.save();
    res.json(savedProveedor);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) return res.status(404).json({ message: "Proveedor not found" });
    res.json(proveedor);
  } catch (error) {
    return res.status(404).json({ message: "Proveedor not found" });
  }
};

export const deleteProveedors = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ message: "Proveedor not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Proveedor not found" });
  }
};

export const updateProveedors = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!proveedor) return res.status(404).json({ message: "Proveedor not found" });
    res.json(proveedor);
  } catch (error) {
    return res.status(404).json({ message: "Proveedor not found" });
  }
};

