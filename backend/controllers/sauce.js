const Sauce = require('../models/Sauce');
const fs = require('fs');





  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        likes: 0, dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({ message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json({ error })})
 };

exports.modifySauce = (req, res, next) => {
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            const sauceObject = req.file ? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };

            if (req.file && sauce.imageUrl) {
                // Supprimer l'ancienne image si une nouvelle image est envoyée
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
            }

            Sauce.updateOne({ _id: sauceId }, { ...sauceObject, _id: sauceId })
                .then(() => res.status(200).json({ message: 'Sauce modified!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};


 exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

  exports.getAllSauces = (req, res, next) => {
    //Recuperation des sauces
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

  exports.likeSauce = (req, res, next) => {
    //La recherche d'objet dans la base de donné
    Sauce.findOne({ _id: req.params.id })
    
    .then((sauce) => {
        //Mise en place d'un switch case()
        switch(req.body.like){
            case 1:
                // like === 1
            if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
                console.log(" like 1");

                //Mise à jour la base de donné
                Sauce.updateOne(
                { _id: req.params.id },
                {
                 $inc: { likes: 1 },
                 $push: { usersLiked: req.body.userId },
               }
               )
               .then(() => res.status(200).json({ message: "Sauce like + 1" }))
               .catch((error) => res.status(400).json({error}));
             }
               break;
        
            case -1 :
            //like = -1 (Dislike = +1)
            if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            console.log("dislikes = 1") 
        
            //Mise à jour de la base de donné
            Sauce.updateOne(
            { _id: req.params.id },
            {
               $inc: { dislikes: -1 },
               $push: { usersDisliked: req.body.userId },
            }
            )
            .then(() => res.status(200).json({ message: "Sauce dislikes +1" }))
            .catch((error) => res.status(400).json({error}));
            }
            break;
             
            case 0 :
            //like = 0, vote neutre
            if(sauce.usersLiked.includes(req.body.userId)){
                    console.log("case = 0") 
           
                   //Mise à jour de la base de donné
                   Sauce.updateOne(
                   { _id: req.params.id },
                   {
                     $inc: { likes: -1 },
                     $pull: { usersLiked: req.body.userId },
                   }
                   )
                .then(() => res.status(200).json({ message: "Sauce like 0" }))
                .catch((error) => res.status(400).json({error}));
                   
            }

            if(sauce.usersDisliked.includes(req.body.userId)){
                console.log(" like = 0") 
    
            //Mise à jour de la base de donné
            Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
            )
            .then(() => res.status(200).json({ message: "Sauce dislike 0" }))
            .catch((error) => res.status(400).json({error}));
            }
            break;
        }
 
    })
    .catch((error) => res.status(404).json({error}));
      
} 

  

  