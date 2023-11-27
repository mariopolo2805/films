const moongose = require('mongoose');

const connect = async () => {
  try {
    await moongose.connect(process.env.MONGO_URL);
    console.log('Connected to DDBB');
  } catch (error) {
    console.log('Error connecting to DDBB', error);
  }
}

module.exports = { connect };