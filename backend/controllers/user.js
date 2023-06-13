const dotenv = require('dotenv');
const result = dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');



//importation models de la base de donnée User.js
const User = require('../models/User');

//signup pour enregistrer le nouvelle utilisateur dans la base de donnée

exports.signup = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA384(req.body.email, `${process.env.EMAIL_CHIFFRE}`).toString();
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        //ce qui va être enregistre dans mongoDB
        const user = new User({
            email: emailCryptoJs,
            password: hash
        });
        
        //envoyer le user dans mongoDB
    user
    .save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));   
};

exports.login = (req, res, next) => {
    const emailCryptoJs = cryptojs.HmacSHA384(req.body.email, `${process.env.EMAIL_CHIFFRE}`).toString();
    //chercher dans la base de donnée si l'utilisateur est bien présent
    User.findOne({ email: emailCryptoJs })
    //si l'email de l'user n'est pas présent, il n'existe pas
    .then((user) => {
        if(!user){
            return res.status(401).json({ error: "l'utilisateur introuvable" })
        }
        bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token:  jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
}