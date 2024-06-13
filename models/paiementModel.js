const mongoose=require('mongoose');

const paiementSchema=new mongoose.Schema(
    {
        montanttotal:Number,
        date:String,
        //idcommande
    },{timestamps:true}
)
const paiement=mongoose.model("paienment",paiementSchema);
module.exports=paiement;