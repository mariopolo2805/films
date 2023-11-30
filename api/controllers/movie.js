const { request } = require('express');
const Movie = require('../models/movie');
require('../models/character');

// GET Listado de Movies
const getMovies = async (request, response, next) => {
  try {
    const { extraInfo } = request.query;
    let list = null;
    if (extraInfo === 'true') {
      list = await Movie.find().populate('characters').exec();
    } else {
      list = await Movie.find();
    }
    return response.status(200).json(list);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
};

// GET Detalle de una Movie
const getMovie = async (request, response, next) => {
  try {
    const { id } = request.params;
    const result = await Movie.findById(id);
    return response.status(200).json(result);
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

// PUT Actualizar una Movie
const putMovie = async (request, response, next) => {
  try {
    const { name, genre, year } = request.body;
    const { id } = request.params;
    const movie = await Movie.findById(id);
    movie.name = name;
    movie.genre = genre;
    movie.year = year;
    const result = await movie.save();
    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
};

// DELETE Eliminar una Movie
const deleteMovie = async (request, response, next) => {
  try {
    const { id } = request.params;
    const result = await Movie.findByIdAndDelete(id);
    console.log('Esta borrando una movie el usuario: ', request.user.email);
    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
};

// ADD Character to Movie

const addCharacterToMovie = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { characterId } = request.body;
    const movie = await Movie.findById(id);
    movie.characters.push(characterId);
    const result = await movie.save();
    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ msg: error });
  }
}


module.exports = {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie,
  addCharacterToMovie
};