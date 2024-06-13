const commandeModel=require('../models/commandeModel');
module.exports.addCommande=async(req,res)=>{
    const {date,statut,montantTotal}=req.body;
        console.log(req.body);

    try{

        const commande=new commandeModel({date,statut,montantTotal});
        const addCommande=await commande.save();
        res.status(201).json({addCommande});
        

    }catch(error){
        res.status(500).json({message:error.message});
    }


}
module.exports.deleteCommande=async(req,res)=>{
    try{
    const {id}=req.params;
    checkCommandeexist=await commandeModel.findById(id);
    if(!checkCommandeexist){
        throw new Error("commande not found");
    }
    await commandeModel.findByIdAndDelete(id);
    res.status(200).json("deleted");

    

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.getAllCommande=async (req,res)=>{

    try{
        const commande=await commandeModel.find();
        if(commande.length===0 && !commande){
            throw new Error("No commande found");
        }
        res.status(200).json({commande});



    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getCommandeByID=async(req,res)=>{

    try{
        const {id}=req.params;
        const commande=await commandeModel.findById(id);
        if(commande.length===0 && !commande){
            throw new Error("No commande found");
        }
        res.status(200).json({commande});



    }catch(error){
        res.status(500).json({message:error.message});
    }


}
module.exports.updateCommande=async(req,res)=>{
    try{
        const {id}=req.params;
        const{date,statut,montantTotal}=req.body;
        const checkCommandeexist=await  commandeModel.findById(id);
        if (!checkCommandeexist){
            throw new Error("commande not found");
        }

        updatedCommande=await  commandeModel.findByIdAndUpdate(id,{$set:{date,statut,montantTotal}});
        res.status(200).json("updated commande");

    }catch(error){
        res.status(500).json({message:error.message});
    }
}