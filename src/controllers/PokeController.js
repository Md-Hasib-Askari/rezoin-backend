const PokeModel = require("../models/PokeModel");
const UserModel = require("../models/UserModel");

const pokeUser = async (req, res) => {
  try {
    const { sender_id, recipient_id } = req.body; 

    // Check if sender and recipient exist
    const [sender, recipient] = await Promise.all([
      UserModel.findById(sender_id),
      UserModel.findById(recipient_id),
    ]);
    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or recipient not found" });
    }
    // If no poke exists, create a new poke
    let poke = await PokeModel.findOne({ sender_id, recipient_id }); 

    if (!poke) {
      poke = new PokeModel({ sender_id, recipient_id, isPoked: true });
      await poke.save();
      return res.status(201).json({ message: "Poke Successful" });
    } 

    // If recipient has poked back, toggle isPoked for both sender and recipient
    const recipientPoke = await PokeModel.findOne({
      sender_id: recipient_id,
      recipient_id: sender_id,
    });
    if (recipientPoke) {
      poke.isPoked = true;
      recipientPoke.isPoked = false;
      await Promise.all([poke.save(), recipientPoke.save()]);
      return res.status(201).json({ message: "Poke Successful" });
    }
     // If recipient hasn't poked back, return error
    return res.status(400).json({
      message: "Recipient has not poked back, sender cannot poke again",
    });
  } catch (error) {
    console.error("Error poking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { pokeUser };
