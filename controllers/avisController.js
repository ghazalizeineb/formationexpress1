const avisModel=require('../models/avisModel');

module.exports.addavis=async(req,res)=>{
    const {note,commentaire}=req.body;
    console.log(req.body);

    try{

        const avis=new avisModel({note,commentaire});
        const addedavis=await avis.save();
        res.status(201).json({addedavis});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getAllavis=async(req,res)=>{

    try{
        const avis=await avisModel.find();
        if(avis.length===0 && !avis){
            throw new Error("Not found avis");
        }
        res.status(200).json({avis});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports.getavisByID=async(req,res)=>{
    try{
        const {id}=req.params;
        const avis=await avisModel.findById(id);
        if(avis.length===0 && !avis){
            throw new Error("avis not found");
        }
        res.status(200).json({avis});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.deleteavis=async(req,res)=>{

    try{
        const {id}=req.params;
        const checkavis=await avisModel.findById(id);
        if(!checkavis){
            throw new Error("avis not found");

        }
        await avisModel.findByIdAndDelete(id);
        res.status(200).json("deleted");

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.updateavis=async(req,res)=>{
    const {id}=req.params;
    const {note,commentaire}=req.body;


    try{
        const checkavis=await avisModel.findById(id);
        if(!checkavis){
            throw new Error ("avis not found");
        }
        await avisModel.findByIdAndUpdate(id,{$set:{note,commentaire}});
        
        res.status(200).json("updated");


    }catch(error){
        res.status(500).json({message:error.message});
    }
}