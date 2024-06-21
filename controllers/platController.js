const platModel =require('../models/platModel');
const menuModel=require('../models/menuModel');
const commandeModel=require('../models/commandeModel');

module.exports.addplat=async(req,res)=>{
    const { nom ,description,prix,menuID}=req.body;
    const {filename }=req.file;
    console.log(req.body);

    try{
        const plat=new  platModel({nom,description,prix,menu:menuID,image_plat:filename});
        const menu=await menuModel.findById(menuID);
        if(!menu){
            throw new Error ("menu not found"); 
        }
       
        await menuModel.findByIdAndUpdate(menuID,{
            $push:{plat: plat._id}})

         

       
        const addedplat=await plat.save();
        res.status(201).json({addedplat});
        


    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getAllplats=async(req,res)=> {

    try{
        const plat=await platModel.find().populate('menu');
        if(plat.length===0 && !plat){
            throw new Error("plat not found");
        }
        res.status(200).json({plat});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getplatByID=async(req,res)=>{

    try{
        const {id}=req.params;
        const plat=await platModel.findById(id).populate('menu');
        if(plat.length===0 && !plat){
            throw new Error("No plat found");
        }
        res.status(200).json({plat});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.deleteplat=async(req,res)=>{
    try{
        const {id}=req.params;
        const checkplat=await platModel.findById(id);
        if(!checkplat){
            throw new Error("plat not found");
        }
        await menuModel.updateMany({},{$pull:{plat:plat._id}}  )
        await platModel.findByIdAndDelete(id);
        res.status(200).json("deleted");  

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports.updatePlat = async (req, res) => {
    const { id } = req.params;
    const { nom, description, prix } = req.body; 
    console.log(req.params);
    console.log(req.body);



    try {
        const checkPlat = await platModel.findById(id);
        console.log(checkPlat);
        if (!checkPlat) {
            return res.status(404).json({ message: "Plat not found" });
        }
        const updateFields = {
             nom,
            description,
            prix,
          };
          console.log(updateFields)
          if (req.file) {
            const { filename } = req.file;
            updateFields.image_plat = filename;
      
            //  if (checkPlat.image_plat && fs.existsSync(`public/images${checkPlat.image_plat}`)) {
            //    fs.unlinkSync(`public/images${checkPlat.image_plat}`);
            //  }
           }
          console.log(updateFields);

          const updatedplat = await platModel.findByIdAndUpdate(id, {
            $set: updateFields,
          }, { new: true });

        res.status(200).json({updatedplat});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

