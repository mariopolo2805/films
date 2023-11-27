const { getMovies, postMovie } = require('../controllers/movie');

const movieRoutes = require('express').Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', postMovie);

module.exports = movieRoutes;