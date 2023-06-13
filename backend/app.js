const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('./mongoDB');
const path = require('path');


//importation des routes
const userRoutes = require('./routes/user');

const saucesRoutes = require('./routes/sauce');




const app = express();

//logger les requests et les responses
app.use(morgan("dev"));

//debug mongoose
mongoose.set('debug', true);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());



app.use('/api/auth', userRoutes) 
app.use('/api/sauces', saucesRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

  
 

module.exports = app;