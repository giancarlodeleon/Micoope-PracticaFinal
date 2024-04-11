import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username, rol, agencia, estado } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya existe"]);

    const passwordHash = await bcrypt.hash(password, 10); // sirve para encriptar la password

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      rol,
      agencia,
      estado
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      rol:userSaved.rol,
      agencia:userSaved.agencia,
      estado:userSaved.estado,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password} = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);
    if (!userFound.estado) return res.status(400).json(["Usuario deshabilitado"]);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contrasena incorrecta"]);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
      agencia: userFound.agencia,
      estado: userFound.estado,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json(["Usuario no encontrado"]);
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    rol:userFound.rol,
    agencia: userFound.agencia,
    estado: userFound.estado,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["Unauthorized"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json(["Unauthorized"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      agencia:userFound.agencia,
      email: userFound.email,
      rol:userFound.rol,
      estado:userFound.estado
    });
  });
};
