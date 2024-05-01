const jwt = require('jsonwebtoken');
const JWT_SECRET = "lernwiths2isverygood@";// process.env.JWT_SECRET;// import from env file


// function to get the user details
const fetchuser = (req,res,next)=>{
    // get user from the jwk token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authonticate using a valid token"})
    }
    
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send({error:"Please authonticate using a valid token"})
    }
}


module.exports = fetchuser
