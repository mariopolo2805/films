require('dotenv').config();
const express = require('express');
const { connect } = require('./config/ddbb');
const movieRoutes = require('./api/routes/movie');

// Config DDBB - MongoAtlas
connect();

// Enrutado base con Express
const app = express();
app.use(express.json());

// Routes (movies + characters)
app.use('/api/v1/movies', movieRoutes);
// app.use('/api/v1/characters', characterRoutes);

app.use('/', (request, response, next) => {
  return response.status(200).json({ msg: 'OK' })
});

app.listen(process.env.PORT, () => {
  console.log('Server levantado!');
});