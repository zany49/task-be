import express from "express";
import {getuserById  } from "../controllers/userControllers.js";
import passport from "passport";
import { configurePassport} from "../middleware/passport-config.js"
import { upload } from "../multer/storage.js";
const router = express.Router();

configurePassport(passport);

router.get('/getuserById/:id',passport.authenticate("user", { session: false }),getuserById)


export default router;