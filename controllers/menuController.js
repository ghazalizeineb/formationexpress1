const menuModel= require('../models/menuModel');

module.exports.addMenu=async(req,res)=>{
    const {name,description,prix,catégorie}=req.body;
    console.log(req.body); 
    try{ 
        
        const menu=new menuModel({name,description,prix,catégorie});
        
        const addedmenu=await menu.save();
         res.status(201).json({addedmenu});


    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports.getmenu= async (req,res)=>{
    try{
        const menu= await menuModel.find();
        if(menu.length===0 &&!menu){
            throw new Error("No menu found");
        }
        res.status(200).json({menu}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

module.exports.getmenuByID= async (req,res)=>{
    try{
        const {id}=req.params;
        const menu= await menuModel.findById(id).populate('plat');
        if(menu.length===0 &&!menu){
            throw new Error("No menu found");
        }
        res.status(200).json({menu}); 



    }catch(error){
        res.status(500).json({message:error.message});
    }};


module.exports.deletemenu=async(req,res)=>{

    try{
        const {id} = req.params;
        const checkmenuexist= await menuModel.findById(id);
        if(!checkmenuexist){
            throw new Error("menu not found");
        }
        await menuModel.findByIdAndDelete(id);
        res.status(200).json("deleted");

         
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.updatemenu=async (req,res)=>{
    try{
    const{id} =req.params;
    const {name,description,catégorie,prix }=req.body;
    const checkmenuexist= await menuModel.findById(id);
        if(!checkmenuexist){
            throw new Error("menu not found");
        }
        updated=await menuModel.findByIdAndUpdate(id,{$set:{name,description,catégorie,prix}});

        res.status(200).json("updated");
    }catch(error){

        res.status(500).json({message:error.message});
    }
}
 