const userModel= require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const maxAge=2*60*60

const createToken=(id)=>{

        return jwt.sign({id},process.env.net_secret,{expiresIn:maxAge})

}
module.exports.addUserClient=async(req,res)=>{
    const {name,email,password,age}=req.body;
    const role ='client';
    console.log(req.body); 
    try{ 
        
        const user=new userModel({name,email,password,age,role});
        const addeduserC=await user.save();
         res.status(201).json({addeduserC});


    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports.addUserAdmin=async(req,res)=>{
    const {name,email,password}=req.body;
    const role ='admin';
    console.log(req.body); 
    try{ 
        
        const admin=new userModel({name,email,password,role});
        const addeduserA=await admin.save();
         res.status(201).json({addeduserA});


    }catch(error){
        res.status(500).json({message:error.message});
    }
};
 module.exports.addUserwithfile=async(req,res)=>{
    const {filename}=req.file;
     const {name,email,password}=req.body;
     const role ='client';
     console.log(req.body); 
     try{ 
        
         const user=new userModel({name,email,password,role, image_User : filename});
         const addeduser=await user.save();
          res.status(201).json({addeduser});


     }catch(error){
         res.status(500).json({message:error.message});
     }
 };



module.exports.getallUsers= async (req,res)=>{
    try{
        const users= await userModel.find();
        if(users.length===0 &&! users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

module.exports.deletetUser=async(req,res)=>{

    try{
        const {id} = req.params;
        const checkuserexist= await userModel.findById(id);
        if(!checkuserexist){
            throw new Error("user not found");
        }
        await userModel.findByIdAndDelete(id);
        res.status(200).json("deleted");

         
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.updateUser=async (req,res)=>{
    try{
    const{id} =req.params;
    const {name,email}=req.body;
    const role ='client';
    const checkuserexist= await userModel.findById(id);
        if(!checkuserexist){
            throw new Error("user not found");
        }
        updated=await userModel.findByIdAndUpdate(id,{$set:{name,email}});

        //(new : true))//sin ajouter user
        res.status(200).json("updated");
    }catch(error){

        res.status(500).json({message:error.message});
    }
}
module.exports.updatepassword=async (req,res)=>{
    try{
    const{id} =req.params;
    const {password}=req.body;
    const checkuserexist= await userModel.findById(id);
        if(!checkuserexist){
            throw new Error("user not found");
        }
        const salt=await bcrypt.genSalt();
        passwordhash= await bcrypt.hash(password,salt);
        console.log(passwordhash);
       
        updated=await userModel.findByIdAndUpdate(id,{$set:{password:passwordhash}});
        
        res.status(200).json("updated");
    }catch(error){

        res.status(500).json({message:error.message});
    }
}
module.exports.getUsersByID= async (req,res)=>{
    try{
        const {id}=req.params;
        const users= await userModel.findById(id).populate('avis').populate('commande');
        if(users.length===0 && !users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};
module.exports.getUsersTri= async (req,res)=>{
    try{
        const users= await userModel.find().sort({age:-1});
        if(users.length===0 &&! users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};
module.exports.getAge= async (req,res)=>{
    const {age}=req.params;
    const ageInt=parseInt(age); 
    console.log(age);

    try{
        const users= await userModel.find(
            {
                age:{
                    $lt:ageInt
                }
            }
        ).sort({age:1});
        if(users.length===0 &&! users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};
    module.exports.getAgebetweenXY= async (req,res)=>{
        const min_age=parseInt(req.query.min_age,10);
        const max_age=parseInt(req.query.max_age,10);

    try{
        const users= await userModel.find(
            {
                age:{
                    $lt:max_age, $gt:min_age
                }
            }
        ).sort({age:1});
        if(users.length===0 &&! users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};



module.exports.searchUserByName= async (req,res)=>{

try{
    const {name}=req.query;

    const users= await userModel.find(
        {
           name:{$regex :name , $options:"i" }
        }
    );
        
    if(users.length===0 &&! users){
        throw new Error("No users found");
    }
    res.status(200).json({users}); 



}catch(error){
    res.status(500).json({message:error.message});
}

};


module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.login(email,password);
        const token=createToken(user._id);
        console.log(token);
        res.cookie('this_is_token',token,{httpOnly:false,maxAge:maxAge*1000});
        res.status(200).json({user})

    }catch(error){
        res.status(500).json({message:error.message}
        )
    }

}


module.exports.logout=async(req,res)=>{
    try{ 
       //const id = req.session.user._id
    //await userModel.findByIdAndUpdate({id: user._id},{statu : true});
        res.cookie('this_is_token',"",{httpOnly:false,maxAge:1});
        res.status(200).json('logout');
    }catch(error){
        res.status(500).json({message:error.message})
    }

}
module.exports.getUserAuth= async (req,res)=>{
    try{
        const id=req.session.user._id ;
        const users= await userModel.findById(id).populate('avis').populate('commande');
        if(users.length===0 && !users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }}
    