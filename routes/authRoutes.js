import express from "express";
import { createOragaization,login } from "../controllers/authControllers.js";
import { upload } from "../multer/storage.js";
const router = express.Router();


router.route("/register").post(upload.single("logo"),createOragaization);

router.route("/login").post(login);



export default router;
