const mongoose=require('mongoose');
const platSchema= new mongoose.Schema({
    nom:String,
    description:String,
    prix:Number,
    image_plat:{type:String,required:true ,default:"plat.png"},

menu:{ type:mongoose.Schema.Types.ObjectId,ref:'menu'} ,
avis:[{type:mongoose.Schema.Types.ObjectId,ref:'avis'}]



})
const plat=mongoose.model("plat",platSchema);
module.exports=plat;
