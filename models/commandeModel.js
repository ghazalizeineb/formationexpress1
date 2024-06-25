const mongoose=require('mongoose');
const paiement = require('./paiementModel');
const CommandeSchema=new mongoose.Schema(
{
    date:String,
    statut:String,
    montantTotal:Number,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user' },
    plat:[{ type:mongoose.Schema.Types.ObjectId,ref:'plat'}],
    paiement:{type:mongoose.Schema.Types.ObjectId,ref:'paiement'}


})
const commande=mongoose.model("commande",CommandeSchema);
module.exports=commande;