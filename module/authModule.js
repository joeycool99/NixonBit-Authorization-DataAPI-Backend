const jwt = require ('jsonwebtoken') 

exports.AuthorizeUser = async (req,res,next) =>{ 
   // Cneck wnetner token exists
    if(!req.headers["token"]) {
    return res.status(401).send({msg :  "Unauthorised"}); 
    }
    // Verify Token
    else{
        try { 
            req.body.user = await jwt.verify(req.headers["token"], "SWERA"); 
            next();
            } 
            catch(err)
            {  
                res.send(err); 
       } 
    }
}
