const avisModel=require('../models/avisModel');
const userModel=require('../models/userModel');

module.exports.addAvis = async (req, res) => {
    const { note, commentaire, userID } = req.body;
    console.log(req.body);

    try {
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const avis = new avisModel({ note, commentaire, user: userID });

        const addedAvis = await avis.save();

        await userModel.findByIdAndUpdate(
            userID,
            { $push: { avis: addedAvis._id } }
        );

        res.status(201).json({ addedAvis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllavis=async(req,res)=>{

    try{
        const avis=await avisModel.find().populate('user');
        if(avis.length===0 && !avis){
            throw new Error("Not found avis");
        }
        res.status(200).json({avis});


    }catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports.getAvisByID = async (req, res) => {
    try {
        const { id } = req.params;
        const avis = await avisModel.findById(id).populate('user');

        if (!avis) {
            return res.status(404).json({ message: "Avis not found" });
        }

        res.status(200).json({ avis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.deleteavis=async(req,res)=>{

    try{
        const {id}=req.params;
        const checkavis=await avisModel.findById(id);
        if(!checkavis){
            throw new Error("avis not found");}
          const avis=  await avisModel.findByIdAndDelete(id);

        await userModel.updateMany({},{$pull:{avis:avis._id}})
        res.status(200).json("deleted");

    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.updateavis=async(req,res)=>{
    const {id}=req.params;
    const {note,commentaire}=req.body;


    try{
        const checkavis=await avisModel.findById(id);
        if(!checkavis){
            throw new Error ("avis not found");
        }
        await avisModel.findByIdAndUpdate(id,{$set:{note,commentaire}});
        
        res.status(200).json("updated");


    }catch(error){
        res.status(500).json({message:error.message});
    }
}