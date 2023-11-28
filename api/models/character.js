const moongose = require('mongoose');

const characterSchema = new moongose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String },
    age: { type: Number, required: true },
  }, {
    timestamps: true
  }
);

const CharacterModel = moongose.model('Character', characterSchema);
module.exports = CharacterModel;
