import Solicitud from "../models/solicitud.model.js";

export const getSolicituds = async (req, res) => {
  try {
    const solicituds = await Solicitud.find();
    res.json(solicituds);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createSolicituds = async (req, res) => {
  try {
    const {codigo,tipo,nombre,estado,descripcion, cliente,dias_credito,date} = req.body;
  const newSolicitud = new Solicitud({
    codigo,
    tipo,
    nombre,
    estado,
    descripcion,
    cliente,
    dias_credito,
    date,
    user: req.user.id,
  });
  const savedSolicitud = await newSolicitud.save();
  res.json(savedSolicitud);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    if (!solicitud) return res.status(404).json({ message: "Solicitud not found" });
    res.json(solicitud);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud not found" });
  }
};

export const deleteSolicituds = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndDelete(req.params.id);
    if (!solicitud) return res.status(404).json({ message: "Solicitud not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud not found" });
  }
};

export const updateSolicituds = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!solicitud) return res.status(404).json({ message: "Solicitud not found" });
    res.json(solicitud);
  } catch (error) {
    return res.status(404).json({ message: "Solicitud not found" });
  }
};
