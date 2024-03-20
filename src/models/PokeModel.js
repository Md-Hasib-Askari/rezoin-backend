const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
  poke_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  poked_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  isPoked: {
    type: Boolean,
    default: false
  }
});

const PokeModel = mongoose.model('Poke', pokeSchema);

module.exports = PokeModel;
