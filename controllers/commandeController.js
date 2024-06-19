const commandeModel=require('../models/commandeModel');
const userModel=require('../models/userModel');


module.exports.addCommande = async (req, res) => {
    const { date,statut,montantTotal,id_user } = req.body;
    console.log(req.body);

    try {
        const user = await userModel.findById(id_user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const commande = new commandeModel({ date,statut,montantTotal, user: id_user });

        const addedcommande = await commande.save();

        await userModel.findByIdAndUpdate(
            id_user,
            { $push: { commande: addedcommande._id } }
        );

        res.status(201).json({ addedcommande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.deleteCommande=async(req,res)=>{
    try{
    const {id}=req.params;
    checkCommandeexist=await commandeModel.findById(id);
    if(!checkCommandeexist){
        throw new Error("commande not found");
    }
    const commande=await commandeModel.findByIdAndDelete(id);
    await userModel.updateMany({},{$pull:{commande:commande._id}})

    res.status(200).json("deleted");

    

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.getAllCommande=async (req,res)=>{

    try{
        const commande=await commandeModel.find().populate('user');
        if(commande.length===0 && !commande){
            throw new Error("No commande found");
        }
        res.status(200).json({commande});



    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getCommandeByID = async (req, res) => {
    try {
        const { id } = req.params;
        const commande = await commandeModel.findById(id).populate('user');
        
        if (!commande) {
            return res.status(404).json({ message: "No commande found" });
        }

        res.status(200).json({ commande });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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