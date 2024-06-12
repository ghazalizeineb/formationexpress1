const userModel= require('../models/userModel');

module.exports.addUser=async(req,res)=>{
    const {name,email,password}=req.body;
    const role ='client';
    console.log(req.body); 
    try{ 
        
        const user=new userModel({name,email,password,role});
        const addeduser=await user.save();
         res.status(201).json({addeduser});


    }catch(error){
        res.status(500).json({message:error.message});
    }
};
 module.exports.addUserwithfile=async(req,res)=>{
    console.log(req.file); 
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

module.exports.getUsers= async (req,res)=>{
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
        updated=await userModel.findByIdAndUpdate(id,{$set:{password}});

        //(new : true))//sin ajouter user
        res.status(200).json("updated");
    }catch(error){

        res.status(500).json({message:error.message});
    }
}
module.exports.getUsersByID= async (req,res)=>{
    try{
        const {id}=req.params;
        const users= await userModel.findById(id);
        if(users.length===0 && !users){
            throw new Error("No users found");
        }
        res.status(200).json({users}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};