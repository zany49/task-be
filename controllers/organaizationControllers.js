import AsyncHandler from "express-async-handler";
import { Org } from "../models/Organaization.js";
import mongoose from "mongoose";
import { gfs } from "../config/database.js";
import { User } from "../models/Users.js";
import { hashPassword } from "../helper.js/bycrpting.js";


export const getOrganizationsDetails = async (req, res)=>{
    try{
        const id = req.params.id;
        const orgData = await Org.findById(id,'-password');
        if (orgData){
            orgData.password = undefined;
            if (orgData.logo !== undefined && orgData.logo !== null) {
                let imageData = Buffer.from("");
                const downloadStream = await gfs.openDownloadStream(
                  new mongoose.Types.ObjectId(orgData.logo)
                );
                await new Promise((resolve, reject) => {
                  downloadStream.on("data", (chunk) => {
                    imageData = Buffer.concat([imageData, chunk]);
                  });
                  downloadStream.on("end", () => {
                    try {
                        orgData.logo = imageData.toString("base64");
                      resolve();
                    } catch (error) {
                      console.error(error);
                    }
                  });
                });
              }
            res.status(200).json({orgData});
        }else{
            res.status(400).json({ message: "Companies not found" });

        }
    }catch(e){
      console.log(e);
        {
            return res.json({error:e})
          }
    }
}

export const updateOrganizationsDetails = async (req, res)=>{
    try{
        const {name,org_type,employee_size,country,state,city,email,logo} = req.body
        if (logo !== undefined || logo !== null) {
            let imageData = Buffer.from("");
            const downloadStream = await gfs.openDownloadStream(
              new mongoose.Types.ObjectId(logo)
            );
            await new Promise((resolve, reject) => {
              downloadStream.on("data", (chunk) => {
                imageData = Buffer.concat([imageData, chunk]);
              });
              downloadStream.on("end", () => {
                try {
                  logo = imageData.toString("base64");
                  resolve();
                } catch (error) {
                  console.error(error);
                }
              });
            });
          }
        const id = req.params.id;
        const orgData = await Org.findByIdAndUpdate(id,{
            name,
            logo,
            org_type,
            employee_size,
            country,
            state,
            city,
            email,
        },{
            new: true,
    });
        if (orgData){
            res.status(200).json({orgData});
        }else{
            res.status(400).json({ message: "Companies not found" });

        }
    }catch(e){
        {
            return res.json({error:e})
          }
    }
}


export const getUserbyOrgId = async (req, res) => {
    try{
      const id = req.params.id;
      console.log("id",id)
      const userData = await User.find({organization_ref:id},"-password");
      res.status(200).json({userData});
  
    }catch (error) {
        console.log("Err--->",error)
      return res.status(500).json({ message: error.message });
  
    }
  };


  export const createUser = async (req, res) => {
    try {
      const { name, password, role, email,designation,organization_ref } = req.body;
  
      if (!name || !designation || !password || !role || !email) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
  
      const hashedPassword = await hashPassword(password);
  
      const userObject = {
        name,
        password: hashedPassword,
        role,
        email,
        designation,
        organization_ref
      };
      const existing = await User.findOne({name});
      console.log("existing-->",existing)
       if (existing) 
       {
          return res.json({error:"Organaization is already in use"})
       }
  
       const userdata = new User(userObject);
  
      await userdata.save();

        console.log("sucessful", userdata);
        return res.json({
            data:userdata,
            ok: true,
        })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  export const updateUser = async (req, res) => {
    try{
      const id = req.params.id;
      const userDataedit = await User.findByIdAndUpdate(id,req.body,{
        new: true,
      });
      console.log("userDataedit--->",userDataedit)
      const userData = await User.find({organization_ref:userDataedit.organization_ref},"-password");
      console.log("userData--->",userData)

      res.status(200).json({userData});
  
    }catch (error) {
      return res.status(500).json({ message: error.message });
  
    }
  };

  export const updateOrg = async (req, res) => {
    try{
      const id = req.params.id;

      let d = {...req.body,logo:req.file?.id}
      const userDataedit = await Org.findByIdAndUpdate(id,d,{
        new: true,
      });
      if (userDataedit.logo !== undefined && userDataedit.logo !== null) {
        let imageData = Buffer.from("");
        const downloadStream = await gfs.openDownloadStream(
          new mongoose.Types.ObjectId(userDataedit.logo)
        );
        await new Promise((resolve, reject) => {
          downloadStream.on("data", (chunk) => {
            imageData = Buffer.concat([imageData, chunk]);
          });
          downloadStream.on("end", () => {
            try {
              userDataedit.logo = imageData.toString("base64");
              resolve();
            } catch (error) {
              console.error(error);
            }
          });
        });
      }
      console.log("userDataedit--->",userDataedit)
      res.status(200).json({orgData:userDataedit});
  
    }catch (error) {
      return res.status(500).json({ message: error.message });
  
    }
  };

  export const deleteUser =async (req, res) => {
    try{
      const id = req.params.id;
      const userData = await User.findByIdAndDelete(id);
      res.status(200).json({message:"deleted user sucessfully"});
  
    }catch (error) {
      return res.status(500).json({ message: error.message });
  
    }
  }