const {
  registerUser,
  loginUser
} = require('../controllers/user');

const movieRoutes = require('express').Router();

movieRoutes.post('/register', registerUser);
movieRoutes.post('/login', loginUser);

module.exports = movieRoutes;