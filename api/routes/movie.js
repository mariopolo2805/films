const {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie,
  addCharacterToMovie
} = require('../controllers/movie');

const movieRoutes = require('express').Router();

movieRoutes.get('/', getMovies);
movieRoutes.get('/:id', getMovie);
movieRoutes.post('/', postMovie);
movieRoutes.put('/:id', putMovie);
movieRoutes.delete('/:id', deleteMovie);
movieRoutes.post('/:id/addCharacter', addCharacterToMovie);

module.exports = movieRoutes;