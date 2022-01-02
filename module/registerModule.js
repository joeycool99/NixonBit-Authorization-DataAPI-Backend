const User = require ("../model/User")
 const Joi = require('joi') ;
 const bcrypt = require('bcrypt'); 
 const jwt = require('jsonwebtoken') 
exports.register = async (req,res,next) => 
{ //User input Validation - Joi Validation 
    const schema = Joi.object({ username: Joi.string().min(4).max(15).required(),
         email: Joi.string().min(6).max(50).email().required(), 
         name: Joi.string().min(4).max(50).required(), 
         phone: Joi.string().pattern(/^[0-9]+$/).required(), 
         address: Joi.string().min(5).max(50).required(), 
         password: Joi.string().min(8).max(10).required(),
          role: Joi.string() 
    })

var {error} = await schema.validate(req.body); 
if (error) return res.status(400).send({msg : error.details[0].message}); 
    // Email already exists 
    var existUser = await User.findOne({"email": req.body.email}).exec(); 
    if(existUser) return res.status(400).send({msg : "Email already exists"}); 
    // Create / register
     const salt = await bcrypt.genSalt(10); 
     req.body.password = await bcrypt.hash(req.body.password, salt); 
    const user = new User({ username: req.body.username,
         name: req.body.name,
          email: req.body.email, 
          address: req.body.address,
           phone: req.body.phone, 
           password: req.body.password 
    }) 
    var response = await user.save(); 
    var token = jwt.sign({response}, 'SWERA',{ expiresIn: '1h'}); 
 res.send(token); 
    }

    exports.login = async (req,res,next) => { 
        // User Input Validation — Joi Validation 
        const schema = Joi.object({ email: Joi.string().min(6).max(50).email().required(), 
            password: Joi.string().min(8).max(10).required()  
    })  
    var {error} = await schema.validate(req.body); 
   
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        return res.status(400).send(msg )}; 
    // Is registerd User 
    var existUser = await User.findOne({"email": req.body.email}).exec();
    if(!existUser) {
        const msg = "Email not registered"
        return res.status(400).send(msg ) }
    // Password compare check
     const isValid = await bcrypt.compare(req.body.password, existUser.password); 
     if(!isValid) return res.status(400).send( "Password doesn't match"); 
// Generate Token 
var token = jwt.sign({existUser}, 'SWERA',{ expiresIn: '1h'}); 
res.send(token); 
} 