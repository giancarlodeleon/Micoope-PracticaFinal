import User from "../models/user.model.js";

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