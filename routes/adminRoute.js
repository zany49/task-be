import express from "express";
import {getallorgdata, getalluserdata, getuserById  } from "../controllers/userControllers.js";
import passport from "passport";
import { configurePassport} from "../middleware/passport-config.js"
import { upload } from "../multer/storage.js";
const router = express.Router();

configurePassport(passport);

router.get('/getuserById/:id',passport.authenticate("admin", { session: false }),getuserById)
router.get('/getalluserdata/:id',passport.authenticate("admin", { session: false }),getalluserdata)
router.get('/getallorgdata/:id',passport.authenticate("admin", { session: false }),getallorgdata)



export default router;