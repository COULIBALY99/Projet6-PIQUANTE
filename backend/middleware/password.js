const  passwordValidator  = require('password-validator');

const  passwordSchema = new passwordValidator();
// Regle de principe pour écrire le mot de passe
passwordSchema 
.is().min(6)                                    // Minimum length 6
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res
        .status(400).json({ error: `mot de passe faible ${ passwordSchema.validate( 'req.body.password', { list : true })}` })
    }
}