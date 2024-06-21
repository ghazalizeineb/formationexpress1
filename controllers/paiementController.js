const paiementModel=require('../models/paiementModel');
const commandeModel=require('../models/commandeModel');

module.exports.addpaiement = async (req, res) => {
    const { montanttotal, date, id_commande } = req.body;
    console.log(req.body);

    try {
        
        
        const commande = await commandeModel.findById(id_commande);
        if (!commande) {
            return res.status(404).json({ message: "Commande not found" });
        }
        const paiement = new paiementModel({ montanttotal, date, commande: id_commande });

        const addedpaiement = await paiement.save();

        await commandeModel.findByIdAndUpdate(id_commande, { $push: { paiement: addedpaiement._id } });
        res.status(201).json({ addedpaiement });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.getAllpaiement=async(req,res)=>{

    try{
        const paiement=(await paiementModel.find()).populate('commande');
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
        const paiement=await paiementModel.findById(id).populate('commande');
        if(paiement.length===0 && !paiement){
            throw new Error("paiement not found");
        }
        res.status(200).json({paiement});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.deletepaiement = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si le paiement existe
        const paiement = await paiementModel.findById(id);
        if (!paiement) {
            return res.status(404).json({ message: "Paiement not found" });
        }

        // Vérifie si la commande associée existe
        const commande = await commandeModel.findById(paiement.commande);
        if (!commande) {
            return res.status(404).json({ message: "Associated commande not found" });
        }

        // Supprime la commande associée au paiement
        await commandeModel.findByIdAndDelete(commande._id);

        // Supprime le paiement lui-même
        await paiementModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Paiement and associated commande deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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