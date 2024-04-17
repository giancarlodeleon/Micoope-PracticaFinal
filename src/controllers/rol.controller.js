import Rol from "../models/rol.model.js";

export const getRols = async (req, res) => {
  try {
    const rols = await Rol.find();
    res.json(rols);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createRols = async (req, res) => {
  try {
    const { name, permission_of_information, permission_Warehouse, permission_Summary, permission_of_Office,permission_of_all_Agencys, date } = req.body;
  const newRol = new Rol({
    name,
    permission_of_information,
    permission_Warehouse,
    permission_Summary,
    permission_of_Office,
    permission_of_all_Agencys,
    date,
    user: req.user.id,
  });
  const savedRol = await newRol.save();
  res.json(savedRol);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) return res.status(404).json({ message: "Rol not found" });
    res.json(rol);
  } catch (error) {
    return res.status(404).json({ message: "Rol not found" });
  }
};

export const deleteRols = async (req, res) => {
  try {
    const rol= await Rol.findByIdAndDelete(req.params.id);
    if (!rol) return res.status(404).json({ message: "Rol not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Rol not found" });
  }
};

export const updateRols = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rol) return res.status(404).json({ message: "Rol not found" });
    res.json(rol);
  } catch (error) {
    return res.status(404).json({ message: "Rol not found" });
  }
};