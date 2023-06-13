## backend

## Fonctionnement du server:  
---> npm run start pour demarer le frontend,
---> nodemon server pour demarer le backend.

## Mis en place des variables d'environnemnt (base de donnée MongoDB)
----> Identifiant,
----> Password (mot de passe).

## Création des routes
## Route pour créer un compte
http://localhost:3000/api/auth/signup

## Route pour se logger
http://localhost:3000/api/auth/login

## Route Post pour créer la sauce
http://localhost:3000/api/sauces/create

## Route Get renvoie le tableau des sauce dans la base de donné MongoDB
http://localhost:3000/api/sauces

## Route Get pour afficher un objet grace à son id
http://localhost:3000/api/sauces/:id

## Route Put pour modifier un objet par son id
http://localhost:3000/api/sauces/:id

## Route Delete pour supprimer un objet grace à son id
http://localhost:3000/api/sauces/:id

## Route Post pour se liker 
http://localhost:3000/api/sauces/id/like


### Sécurité
-----> Mise en place de middleware password validator pour la condition de principe de mot de passe
-----> Mise en place de validatorEmail pour controler la sécurité d'adresse email de l'utilisateur

### Fonctionnnement de likes et dislikes
Mise en place de l'instruction SWITCH  par rapport au mode d'execution des conditions de fonctionnement de likes et dislikes
----> case condition d'execution,
----> break fin d'execution de la condition