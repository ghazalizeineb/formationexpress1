const mongoose=require('mongoose');
 const menuShcema=new mongoose.Schema(
     {
        name:String,
        description:String,
         catégorie:String,
         prix:Number,
    
         image_Menu:{type:String,required:false,default:"menu.png"}


    },{timestamps:true}

 );
    

const menu=mongoose.model("menu",menuShcema);
module.exports= menu;