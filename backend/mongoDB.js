const dotenv = require('dotenv');
const result = dotenv.config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const password = process.env.MOTDEPASSE
const username = process.env.USER
const cluster = process.env.DB_GRAPPE
const retry = process.env.DB_MAJORITY

const uri = 
`mongodb+srv://${username}:${password}@${cluster}?${retry}`;
mongoose
  .connect(uri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  module.exports = mongoose;