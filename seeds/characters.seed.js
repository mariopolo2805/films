require('dotenv').config();
const moongose = require('mongoose');

const Character = require('../api/models/character');

const characterListBk = [
  {
    name: "Marlon Brando",
    gender: "Masculino",
    age: 80
  },
  {
    name: "Meryl Streep",
    gender: "Femenino",
    age: 72
  },
  {
    name: "Viggo Mortensen",
    gender: "Masculino",
    age: 63
  },
  {
    name: "Jessica Chastain",
    gender: "Femenino",
    age: 44
  },
  {
    name: "John Travolta",
    gender: "Masculino",
    age: 67
  },
  {
    name: "Tom Hanks",
    gender: "Masculino",
    age: 65
  },
  {
    name: "Cate Blanchett",
    gender: "Femenino",
    age: 52
  },
  {
    name: "Jeremy Irons",
    gender: "Masculino",
    age: 73
  },
  {
    name: "Morgan Freeman",
    gender: "Masculino",
    age: 84
  },
  {
    name: "Keanu Reeves",
    gender: "Masculino",
    age: 57
  }
];

moongose.connect(process.env.MONGO_URL)
  .then(async () => {
    const list = await Character.find();
    if (list.length) {
      await Character.collection.drop();
    }
  })
  .catch(error => console.log('Error connecting to DDBB', error))
  .then(async () => {
    const characterListModel = characterListBk.map(character => new Character(character));
    await Character.insertMany(characterListModel);
    console.log('BK loaded at MongoAtlas!');
  })
  .catch(error => console.log('Error inserting characters', error))
  .finally(() => {
    console.log('Disconnecting from DDBB');
    moongose.disconnect();
  });