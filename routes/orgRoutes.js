import express from "express";
import {
  getOrganizationsDetails,
  getUserbyOrgId,
  createUser,
  updateUser,
  deleteUser,
  updateOrg
} from "../controllers/organaizationControllers.js";

import { upload } from "../multer/storage.js";
import passport from "passport";
import {configurePassport} from "../middleware/passport-config.js"

const router = express.Router();
configurePassport(passport);
// router
//   .route("/")
//   .get(verifyToken, getAllCompanies)
//   .post( verifyToken,upload.single("logo"), createCompany)  //verifyToken,
//   .patch(verifyCompanyToken, updateCompany)
//   .delete();

router.get("/:id",passport.authenticate("org", { session: false }),getOrganizationsDetails)
router.get("/getuserlist/:id",passport.authenticate("org", { session: false }),getUserbyOrgId)
router.post("/createuser", passport.authenticate("org", { session: false }),createUser)
router.put("/edit-user/:id", passport.authenticate("org", { session: false }),updateUser)
router.put("/edit-org/:id", passport.authenticate("org", { session: false }),upload.single("logo"),updateOrg)
router.delete("/delete-user/:id", passport.authenticate("org", { session: false }),deleteUser)


export default router;
