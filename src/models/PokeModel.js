const mongoose = require("mongoose");

const pokeSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const PokeModel = mongoose.model("Poke", pokeSchema);

module.exports = PokeModel;
