const mongoose=require('mongoose');

const paiementSchema=new mongoose.Schema(
    {
        montanttotal:Number,
        date:String,
        commande:{type:mongoose.Schema.Types.ObjectId,ref:'commande'}
    }
)
const paiement=mongoose.model("paienment",paiementSchema);
module.exports=paiement;