const mongoose=require('mongoose');
const CommandeSchema=new mongoose.Schema(
{
    date:String,
    statut:String,
    montantTotal:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user' }


})
const commande=mongoose.model("commande",CommandeSchema);
module.exports=commande;