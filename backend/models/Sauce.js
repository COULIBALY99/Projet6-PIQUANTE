//importation de mongoose
const mongoose = require('mongoose');

//donnée sauce pour la page du frontend
const sauceSchema =  mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },  
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, min: 1, max: 10, required: true },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 } ,
    usersLiked: [ String ],
    usersDisliked: [ String ],
}) 


module.exports = mongoose.model('Sauce', sauceSchema);


