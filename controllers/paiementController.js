const paiementModel=require('../models/paiementModel');

module.exports.addpaiement=async(req,res)=>{
    const{ montanttotal,date}=req.body;
    console.log(req.body);


    try{
        const paiement=new paiementModel({montanttotal,date});
        const addedpaiement=await paiement.save();
        res.status(201).json({addedpaiement});


    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.getAllpaiement=async(req,res)=>{

    try{
        const paiement=await paiementModel.find();
        if(paiement.length===0 && !paiement){
            throw new Error("paiement not found");
        }
        res.status(200).json({paiement});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getpaiementByID=async(req,res)=>{

    try{
        const {id}=req.params;
        const paiement=await paiementModel.findById(id);
        if(paiement.length===0 && !paiement){
            throw new Error("paiement not found");
        }
        res.status(200).json({paiement});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.deletepaiement=async(req,res)=>{

    try{
        const  {id}=req.params;
        const checkpaiement=await paiementModel.findById(id);
        if( !checkpaiement){
            throw new Error("paiement not found");
        }
        await paiementModel.findByIdAndDelete(id);
        res.status(200).json("deleted");


    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.updatepaiement=async(req,res)=>{
    const {id}=req.params;
    const{montanttotal,date}=req.body;

    try{
        const checkpaiement=await paiementModel.findById(id);
        if( !checkpaiement){
            throw new Error("paiement not found");
        }
        await paiementModel.findByIdAndUpdate(id,{$set:{montanttotal,date}});
        res.status(200).json("updated");





    }catch(error){
        res.status(500).json({message:error.message});
    }
}