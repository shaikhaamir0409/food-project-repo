import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    try {
        console.log("🔥 API HIT HO GAYA");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file not received"
            });
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category, // IMPORTANT
            image: req.file.filename
        });

        const savedFood = await food.save();

        res.json({
            success: true,
            message: "Food Added",
            data: savedFood
        });

    } catch (error) {
        console.log("DB ERROR:", error);   // 🔥 IMPORTANT
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//all food list

const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { addFood,listFood,removeFood };