const jwt =require('jsonwebtoken');
const userModel=require('../models/userModel');


module.exports.requireAuthUser=async(req,res,next)=>{

    const token=req.cookies.this_is_token
    console.log('jwb',token);
    if(token){

        jwt.verify(token,process.env.net_secret,async(error,decodedToken) =>{
            if(error){
                res.status(401).json("problem decoding token")
            }else{
                console.log("token",decodedToken);
                console.log("decodedToken",decodedToken.id);

                user=await userModel.findById(decodedToken.id)
                console.log("user",user);
                req.session.user=user
                next();
            }

    }
    );

    }else{
        res.status(401).json("pas de token")
    }




}