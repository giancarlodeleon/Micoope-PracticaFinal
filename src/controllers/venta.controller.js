import Venta from "../models/venta.model.js";

export const getVentas = async (req, res) => {
  try {
    const venta = await Venta.find();
    res.json(venta);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createVentas = async (req, res) => {
  try {
    const { solicitud,numero,numero_factura,FEL_serie,FEL_numero,monto,pendiente,fecha_pago,cliente,date} = req.body;
  const newVenta = new Venta({
    solicitud,
    numero,
    numero_factura,
    FEL_serie,
    FEL_numero,
    monto,
    pendiente,
    fecha_pago,
    cliente,
    date,
    user: req.user.id,
  });
  const savedVenta = await newVenta.save();
  res.json(savedVenta);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ message: "Venta not found" });
    res.json(venta);
  } catch (error) {
    return res.status(404).json({ message: "Venta not found" });
  }
};

export const deleteVentas = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).json({ message: "Venta not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Venta not found" });
  }
};

export const updateVentas = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!venta) return res.status(404).json({ message: "Venta not found" });
    res.json(venta);
  } catch (error) {
    return res.status(404).json({ message: "Venta not found" });
  }
};
