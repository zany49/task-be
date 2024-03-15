import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const OrganaizationSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: null,
    },
    name:{
      type: String,
      default:null
    },
    org_type: {
      type: String,
      enum: ['private', 'public']
    },
    employee_size:{
      type:Number,
      default:0
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },  
    password:{
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum: ['org']
    }
  },
  {
    timestamps: true,
  }
);

OrganaizationSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });
export const Org = mongoose.model("Org", OrganaizationSchema);
