const mongoose=require('mongoose');
const CommandeSchema=new mongoose.Schema(
{
    date:String,
    statut:String,
    montantTotal:Number,
    //userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }


})
const commande=mongoose.model("commande",CommandeSchema);
module.exports=commande;