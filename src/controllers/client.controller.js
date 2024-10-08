import Client from "../models/client.model.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({
      user: req.user.id,
    });
    res.json(clients);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createClients = async (req, res) => {
  try {
    const {
      code,
      nit,
      name,
      type,
      email,
      social,
      department,
      municipio,
      direction,
      reference,
      phone,
      plazo_credito,
      factura,
      nota,
      date,
    } = req.body;
    const newClient = new Client({
      code,
      nit,
      name,
      type,
      email,
      social,
      department,
      municipio,
      direction,
      reference,
      phone,
      plazo_credito,
      factura,
      nota,
      date,
      user: req.user.id,
    });
    const savedClient = await newClient.save();
    res.json(savedClient);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    return res.status(404).json({ message: "Client not found" });
  }
};

export const deleteClients = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Client not found" });
  }
};

export const updateClients = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    return res.status(404).json({ message: "Client not found" });
  }
};

export const countAllClients = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json({ count }); // Devolver el conteo en la respuesta
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
