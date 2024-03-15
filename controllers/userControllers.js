import { User } from "../models/Users.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword } from "../helper.js/bycrpting.js";
import { Org } from "../models/Organaization.js";


export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
}




export const getuserById = async (req, res) => {
  try{
    const id = req.params.id;
    const userData = await User.findById(id);
    res.status(200).json({userData});

  }catch (error) {
    return res.status(500).json({ message: error.message });

  }
};


export const getalluserdata = async (req, res) => {
  try{
    const id = req.params.id;
    const userData = await User.find({organization_ref:id},'-password');
    res.status(200).json({userData});

  }catch (error) {
    return res.status(500).json({ message: error.message });

  }
};

export const getallorgdata = async (req, res) => {
  try{
    const id = req.params.id;
    const userData = await Org.find({_id:id},'-password');
    res.status(200).json({userData});

  }catch (error) {
    return res.status(500).json({ message: error.message });

  }
};

export const updateUser = async (req, res) => {
  try{
    const id = req.params.id;
    const userData = await User.findByIdAndUpdate(id,req.body,{
      new: true,
    });
    res.status(200).json({userData});

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
