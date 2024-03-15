import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Org } from "../models/Organaization.js";
import { comparePassword, hashPassword } from "../helper.js/bycrpting.js";
import { gfs } from "../config/database.js";
import mongoose from "mongoose";


export const createOragaization = async (req,res)=>{
  console.log("req--->",req.body)
  try{
  const {name,org_type,employee_size,email,password,role,logo} = req.body
  console.log("org_type",org_type,req.body)
  if (!name|| !org_type|| !employee_size || !email|| !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if(!password || password.length< 6) 
    {
      return res.json({error:"Pasword length must be above 6 characters"})
    }

    const existing = await Org.findOne({name});
    console.log("existing-->",existing,logo)
     if (existing) 
     {
        return res.json({error:"Organaization is already in use"})
     }

     const hashPwd = await hashPassword(password);


     const orgdata = new Org({
      name,
      logo:req.file?.id,
      org_type,
      employee_size,
      email,
      password:hashPwd ,
      role
    });

    await orgdata.save();
      console.log("sucessful", orgdata);
      const accessToken = jwt.sign(
        {
          credInfo: {
            id: orgdata._id,
            name: name,
            role: role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      orgdata.password = undefined;
      return res.json({
        userdetails:orgdata,
          accessToken
      })

}catch(err){
  console.error(err);
    {
      return res.status(500).json({error:err.message})
    }

}

}

export const login = async (req, res) => {
  try{
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  var foundUser ;
  console.log("role--->",role)
  if(role === "org") {
    foundUser = await Org.findOne({ email, role }).exec();
  }else{
    console.log("in")
    foundUser = await User.findOne({ email, role }).exec();
  }
  if (!foundUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await comparePassword(password, foundUser.password);
  if (!match) return res.status(400).json({ message: "Enter valid password" });

  const accessToken = jwt.sign(
    {
      credInfo: {
        id: foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  foundUser.password = undefined;
    res.json({ 
      accessToken,
      userdetails:foundUser
    });
  }catch(err){
    console.error(err);
    {
      return res.status(500).json({error:err.message})
    }
  }

};






