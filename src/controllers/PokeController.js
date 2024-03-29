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
      return res.status(404).json({status: 'error', message: "Sender or recipient not found" });
    }

    // Check if there is a poke from sender to recipient
    let poke = await PokeModel.findOne({ sender_id, recipient_id });

    // If no poke exists, create a new poke
    if (!poke) {
      poke = new PokeModel({ sender_id, recipient_id, isPoked: true });
      await poke.save();
      const recipientPoke = await PokeModel.findOne({
        sender_id: recipient_id,
        recipient_id: sender_id,
      });
      if (recipientPoke) {
        poke.isPoked = true;
        recipientPoke.isPoked = false;
        await Promise.all([poke.save(), recipientPoke.save()]);
        return res.status(201).json({status: 'success', message: "Poke sent successfully" });
      }
    } else if (poke.isPoked == true) {
    // Else if recipient hasn't poked back, return error
      return res.status(400).json({
        status: 'error',message: "Recipient has not poked back, sender cannot poke again",
      });
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
      return res.status(201).json({status: 'success', message: "Poke sent successfully" });
    }

  } catch (error) {
    console.error("Error poking user:", error);
    res.status(500).json({  error: error.message});
  }
};

module.exports = { pokeUser };
