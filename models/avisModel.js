const mongoose=require('mongoose');

const avisSchema=new mongoose.Schema(
    {
        note:Number,
        commentaire:String,
        user:{type:mongoose.Schema.Types.ObjectId,ref:'user' },
        plat:{type:mongoose.Schema.Types.ObjectId,ref:'plat'}

    }
)
const avis=mongoose.model("avis",avisSchema);
module.exports=avis;