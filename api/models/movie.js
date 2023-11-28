const moongose = require('mongoose');

const movieSchema = new moongose.Schema(
  {
    name: { type: String, required: true },
    genre: { type: String },
    year: { type: Number, required: true },
    characters: [{ type: moongose.Schema.Types.ObjectId, ref: 'Character' }]
  }, {
    timestamps: true
  }
);

const MovieModel = moongose.model('Movie', movieSchema);
module.exports = MovieModel;
