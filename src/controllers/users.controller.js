import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(400).json(["El correo ya existe"]);
    res.json(user);
  } catch (error) {
    return res.status(400).json(["El correo ya existe"]);
  }
};
