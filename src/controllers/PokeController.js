const PokeModel = require("../models/PokeModel");
const UserModel = require("../models/UserModel");

const pokeUser = async (req, res) => {
  try {
    const { sender_id, recipient_id } = req.body;

    // Check if sender and recipient exist
    const sender = await UserModel.findById(sender_id);
    const recipient = await UserModel.findById(recipient_id);
    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or recipient not found" });
    }

    // Check if the recipient has been poked before
    let poke = await PokeModel.findOne({ sender_id, recipient_id });

    if (!poke) {
      poke = new PokeModel({ sender_id, recipient_id });
    } else {
      poke.isPoked = !poke.isPoked;
    }

    await poke.save();

    res.status(201).json({ message: "Poke sent successfully" });
  } catch (error) {
    console.error("Error poking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { pokeUser };
