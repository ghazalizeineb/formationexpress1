const mongoose=require('mongoose');
const platSchema= new mongoose.Schema({
    nom:String,
    description:String,
    prix:Number,
    //idmenu




})
const plat=mongoose.model("plat",platSchema);
module.exports=plat;
