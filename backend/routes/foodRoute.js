import express from "express";
import multer from "multer";
import fs from "fs";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// POST API
foodRouter.post("/add", upload.single("image"), addFood);

//GET API
foodRouter.get("/list", listFood)

//REMOVE API
foodRouter.post("/remove",removeFood);

export default foodRouter;