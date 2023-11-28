require('dotenv').config();
const moongose = require('mongoose');

const Movie = require('../api/models/movie');

const movieListBk = [
  {
    name: "El Padrino",
    genre: "Drama",
    year: 1972
  },
  {
    name: "La Lista de Schindler",
    genre: "Drama",
    year: 1993
  },
  {
    name: "El Señor de los Anillos: La Comunidad del Anillo",
    genre: "Aventura",
    year: 2001
  },
  {
    name: "Interestelar",
    genre: "Ciencia ficción",
    year: 2014
  },
  {
    name: "Pulp Fiction",
    genre: "Crimen",
    year: 1994
  },
  {
    name: "Forrest Gump",
    genre: "Drama",
    year: 1994
  },
  {
    name: "El Laberinto del Fauno",
    genre: "Fantasía",
    year: 2006
  },
  {
    name: "El Rey León",
    genre: "Animación",
    year: 1994
  },
  {
    name: "Cadena perpetua",
    genre: "Drama",
    year: 1994
  },
  {
    name: "Matrix",
    genre: "Ciencia ficción",
    year: 1999
  }
];

moongose.connect(process.env.MONGO_URL)
  .then(async () => {
    const list = await Movie.find();
    if (list.length) {
      await Movie.collection.drop();
    }
  })
  .catch(error => console.log('Error connecting to DDBB', error))
  .then(async () => {
    const movieListModel = movieListBk.map(movie => new Movie(movie));
    await Movie.insertMany(movieListModel);
    console.log('BK loaded at MongoAtlas!');
  })
  .catch(error => console.log('Error inserting movies', error))
  .finally(() => {
    console.log('Disconnecting from DDBB');
    moongose.disconnect();
  });