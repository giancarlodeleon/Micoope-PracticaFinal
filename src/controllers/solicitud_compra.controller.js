import SolicitudCompra from "../models/solicitud_compra.model.js";

export const getSolicitudsCompra = async (req, res) => {
  try {
    const solicituds_compra = await SolicitudCompra.find();
    res.json(solicituds_compra);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createSolicitudsCompra = async (req, res) => {
  try {
    const {nit,codigo,tipo,nombre,descripcion,proveedor,date} = req.body;
  const newSolicitudCompra = new SolicitudCompra({
    codigo,
    tipo,
    nombre,
    proveedor,
    descripcion,
    nit,
    date,
    user: req.user.id,
  });
  const savedSolicitudCompra = await newSolicitudCompra.save();
  res.json(savedSolicitudCompra);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getSolicitudCompra = async (req, res) => {
  try {
    const solicitud_compra = await SolicitudCompra.findById(req.params.id);
    if (!solicitud_compra) return res.status(404).json({ message: "Solicitud Compra not found" });
    res.json(solicitud_compra);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud Compra not found" });
  }
};

export const deleteSolicitudsCompra = async (req, res) => {
  try {
    const solicitud_compra = await SolicitudCompra.findByIdAndDelete(req.params.id);
    if (!solicitud_compra) return res.status(404).json({ message: "Solicitud Compra not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud Compra not found" });
  }
};

export const updateSolicitudsCompra = async (req, res) => {
  try {
    const solicitud_compra = await SolicitudCompra.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!solicitud_compra) return res.status(404).json({ message: "Solicitud Compra not found" });
    res.json(solicitud_compra);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud Compra not found" });
  }
};
