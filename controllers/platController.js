const platModel =require('../models/platModel');

module.exports.addplat=async(req,res)=>{
    const { nom ,description,prix,}=req.body;
    console.log(req.body);

    try{
        const plat=new  platModel({nom,description,prix});
        const addedplat=await plat.save();
        res.status(201).json({addedplat});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.getAllplats=async(req,res)=> {

    try{
        const plat=await platModel.find();
        if(plat.length===0 && !plat){
            throw new Error("No plat found");
        }
        res.status(200).json({plat});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getplatByID=async(req,res)=>{

    try{
        const {id}=req.params;
        const plat=await platModel.findById(id);
        if(plat.length===0 && !plat){
            throw new Error("No plat found");
        }
        res.status(200).json({plat});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.deleteplat=async(req,res)=>{
    try{
        const {id}=req.params;
        const checkplat=await platModel.findById(id);
        if(!checkplat){
            throw new Error("plat not found");
        }
        await platModel.findByIdAndDelete(id);
        res.status(200).json("deleted");

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.updateplat=async(req,res)=>{
    const {id}=req.params;
    const{nom,description,prix}=req.body;

    try{
        const checkplat=await platModel.findById(id);
        if(!checkplat){
            throw new Error("plat not found");
        }
        updatedplat=await  platModel.findByIdAndUpdate(id,{$set:{nom,description,prix}});
        res.status(200).json("updated");


    }catch(error){
        res.status(500).json({message:error.message});
    }
}