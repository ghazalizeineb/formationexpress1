const mongoose=require('mongoose');
 const bcrypt=require('bcrypt');
 const userShcema=new mongoose.Schema(
     {
        name:String,
        age:Number,
          email:{ 
         type:String ,
          unique:true,
          required:true,
         match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']

         },
         password:String,
        role:{
             type:String,
             enum:['admin','client']
         },
         image_User:{type:String,required:false,default:"client.png"},
         avis:[{ type:mongoose.Schema.Types.ObjectId,ref:'avis'}],
         commande:[{ type:mongoose.Schema.Types.ObjectId,ref:'commande'}]

    },{timestamps:true}

 );
    userShcema.post('save',async function(req,res,next){
     console.log("new user was creates and saved successfully");
     next()


}
 );
 userShcema.pre('save',async function(next){
     try{
        const salt=await bcrypt.genSalt();
        const user =this
        user.password= await bcrypt.hash(user.password,salt)
        user.CreatesAt=new Date(),
        user.UpdatedAt=new Date(),
        next();

     }  catch(error){
        next(error);
     }
})


userShcema.statics.login=async function(email,password){
   const user = await this.findOne({email:email});
   if(user){
      const auth=await bcrypt.compare(password,user.password);
      if (auth){
         return user;
      }
      throw new Error("incorrect password");
   }
   throw new Error("incorrect email");

};



const user=mongoose.model("user",userShcema);
module.exports= user;


 


