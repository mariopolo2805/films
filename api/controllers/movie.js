const Movie = require('../models/movie');

// GET Listado de Movies
const getMovies = async (request, response, next) => {
  try {
    const list = await Movie.find();
    return response.status(200).json(list);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
};

// POST Crear una Movie
const postMovie = async (request, response, next) => {
  try {
    const { name, genre, year } = request.body;
    const movie = new Movie({ name, genre, year });
    const result = await movie.save();
    return response.status(201).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
};


module.exports = {
  getMovies,
  postMovie
};