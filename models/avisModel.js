const mongoose=require('mongoose');

const avisSchema=new mongoose.Schema(
    {
        note:Number,
        commentaire:String,
        //iduser
        //idplat
    }
)
const avis=mongoose.model("avis",avisSchema);
module.exports=avis;