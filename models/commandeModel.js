const mongoose=require('mongoose');
const CommandeSchema=new mongoose.Schema(
{
    date:String,
    statut:String,
    montantTotal:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user' },
    plat:[{ type:mongoose.Schema.Types.ObjectId,ref:'plat'}]


})
const commande=mongoose.model("commande",CommandeSchema);
module.exports=commande;