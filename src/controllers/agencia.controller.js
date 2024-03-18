import Agencia from "../models/agencia.model.js";

export const getAgencias = async (req, res) => {
  try {
    const agencia = await Agencia.find();
    res.json(agencia);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createAgencia = async (req, res) => {
  const { code } = req.body;

  const agenciaFound = await Agencia.findOne({ code });
  if (agenciaFound) return res.status(400).json(["Codigo ya existe"]);
  try {
    const { name, code, date } = req.body;
    const newAgencia = new Agencia({
      name,
      code,
      date,
      user: req.user.id,
    });
    const savedAgencia = await newAgencia.save();
    res.json(savedAgencia);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAgencia = async (req, res) => {
  try {
    const agencias = await Agencia.findById(req.params.id);
    if (!agencias)
      return res.status(404).json({ message: "Agencias not found" });
    res.json(agencias);
  } catch (error) {
    return res.status(404).json({ message: "Agencias not found" });
  }
};

export const deleteAgencia = async (req, res) => {
  try {
    const agencia = await Agencia.findByIdAndDelete(req.params.id);
    if (!agencia) return res.status(404).json({ message: "Agencia not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Agencia not found" });
  }
};

export const updateAgencia = async (req, res) => {
  try {
    const agencia = await Agencia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!agencia) return res.status(404).json(["Codigo ya existe"]);
    res.json(agencia);
  } catch (error) {
    return res.status(500).json(["Codigo ya existe"]);
  }
};
