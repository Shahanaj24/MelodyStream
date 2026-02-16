const jwt = require("jsonwebtoken");

async function authArtist(req, res, next){
 const token = req.cookies.token;

 if(!token){
    return res.status(401).json({
        message:"Unauthorized access - No token"
    })
 }
 try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role !== "artist"){
        return res.status(403).json({
            message:"Forbidden access - Not an artist"
        })
    }
    req.user = decoded;
    next();
 }catch(error){
    return res.status(401).json({
        message:"Unauthorized access",
        error:error.message
    })
 }
}

async function authUser(req, res,next) {
    const token = req.cookies.token;

    if(!token){
         return res.status(401).json({
            message:"Unauthorized access - No token"
         })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({
                message:"Forbidden access - Not a user or artist"
            })
         }
         
      res.user = decoded;
     next();
        }
    catch(error){
        return res.status(401).json({
            message:"Unauthorized access",
            error:error.message })
     }

 }
module.exports = { authArtist , authUser};